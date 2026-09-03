import { contentfulClient } from "./contentful";
import type { EntryFieldTypes } from "contentful";

export async function fetchData() {
  interface Paper {
    contentTypeId: "cilab";
    fields: {
      title: EntryFieldTypes.Text;
      author: EntryFieldTypes.Text;
      publisher: EntryFieldTypes.Text;
      identifier: EntryFieldTypes.Text;
      abstract: EntryFieldTypes.Text;
      content: EntryFieldTypes.Text;
      date: EntryFieldTypes.Date;
      supplementaryMaterial?: {
        fields: {
          file: {
            url: string;
          };
        };
      };
      thumbnail: {
        fields: {
          file: {
            url: string;
          };
        };
      };
      metadata: {
        tags: string[];
      };
    };
  }

  const limit = 100; // 每次查询的条目数量
  let skip = 0; // 跳过的条目数量
  let entries: any = { items: [] }; // 存储所有条目的对象

  // 分页查询，直到获取所有条目
  while (true) {
    const response = await contentfulClient.getEntries<Paper>({
      content_type: "cilab",
      limit,
      skip,
    });

    entries.items = entries.items.concat(response.items);

    if (response.items.length < limit) {
      break; // 如果返回的条目数量小于 limit，说明已经获取到所有条目
    }

    skip += limit; // 更新 skip 的值，继续查询下一页
  }

  // Return the exact Contentful fields that are missing from an entry. Keeping
  // this check in one place ensures filtering and diagnostics cannot drift.
  const getMissingFields = (entry: any): string[] => {
    const fields = entry.fields ?? {};
    const missingFields: string[] = [];

    if (!fields.title) missingFields.push("title");
    if (!fields.author) missingFields.push("author");
    if (!fields.publisher) missingFields.push("publisher");
    if (!fields.identifier) missingFields.push("identifier");
    if (!fields.abstract) missingFields.push("abstract");
    if (!fields.date) missingFields.push("date");
    if (!fields.thumbnail?.fields?.file?.url) {
      missingFields.push("thumbnail.fields.file.url");
    }
    if (!(entry.metadata?.tags?.length > 0)) {
      missingFields.push("metadata.tags");
    }

    return missingFields;
  };

  // 过滤掉不具有指定字段的条目
  const filteredItems = entries.items.filter(
    (entry: any) => getMissingFields(entry).length === 0
  );

  // 异常值检测
  console.log(`论文总数：${filteredItems.length}`);
  const invalidEntries = entries.items
    .map((entry: any) => ({ entry, missingFields: getMissingFields(entry) }))
    .filter(({ missingFields }: { missingFields: string[] }) => missingFields.length > 0);
  if (invalidEntries.length > 0) {
    console.log("以下条目缺失字段：");
    invalidEntries.forEach(
      ({ entry, missingFields }: { entry: any; missingFields: string[] }) => {
        const title = entry.fields?.title || "（无标题）";
        console.log(`- ${title}：缺失字段 ${missingFields.join("、")}`);
      }
    );
  }

  filteredItems.sort((a: any, b: any) => {
    // 首先按年份降序排序
    const yearA = new Date(a.fields.date).getFullYear();
    const yearB = new Date(b.fields.date).getFullYear();
    if (yearA !== yearB) {
      return yearB - yearA;
    }

    // 对于同一年份的论文，按照 publisher 的优先级排序
    const priorityOrder = [
      "TPAMI",
      "IJCV",
      "AIS",
      "TIP",
      "TCI",
      "TOG",
      "TCSVT",
      "NeurIPS",
      "MM",
      "ICCV",
      "ECCV",
      "ACL",
      "CVPR",
      "AAAI",
    ];
    const priorityA = priorityOrder.indexOf(a.fields.publisher);
    const priorityB = priorityOrder.indexOf(b.fields.publisher);
    if (priorityA !== priorityB) {
      if (priorityA === -1) return 1;
      if (priorityB === -1) return -1;
      return priorityA - priorityB;
    }

    // 对于同一 publisher 的论文，按照 identifier 升序排序
    if (a.fields.publisher === b.fields.publisher) {
      return a.fields.identifier.localeCompare(b.fields.identifier);
    }

    // 对于其他 publisher 之间的顺序，按照字母顺序排序
    return a.fields.publisher.localeCompare(b.fields.publisher);
  });

  // 创建一个新的对象，并将过滤和排序后的 items 赋值给 items 属性
  const result = {
    ...entries,
    items: filteredItems,
  };

  return result;
}
