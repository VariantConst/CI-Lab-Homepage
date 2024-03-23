import { contentfulClient } from "./contentful";
import type { EntryFieldTypes } from "contentful";

export async function fetchData() {
    // 你的API调用逻辑
    interface Team {
        contentTypeId: "team";
        fields: {
          name: EntryFieldTypes.Text;
          nameCn: EntryFieldTypes.Text;
          year: EntryFieldTypes.Integer;
          educationCurrent: EntryFieldTypes.Text;
          educationPrevious: EntryFieldTypes.Text;
          educationNext: EntryFieldTypes.Text;
          priority: EntryFieldTypes.Integer;
          homepage: EntryFieldTypes.Text;
          image: EntryFieldTypes.Text;
          introduction: EntryFieldTypes.Text;
        };
      }
      
      const entries = await contentfulClient.getEntries<Team>({
        content_type: "team",
      });
      
      return entries;
}