const AnimatedLink = ({ href, className = "", children }) => {
  return (
    <a href={href} className={`animated-link relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="animated-link-underline absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-500 ease-in-out"></span>
    </a>
  );
};

export default AnimatedLink;
