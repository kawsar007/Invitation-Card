
interface FooterSectionProps {
  theme: string;
}

interface FooterColumn {
  title: string;
  links: {
    text: string;
    href: string;
  }[];
}

export default function Footer({ theme }: FooterSectionProps) {

  const footerColumns: FooterColumn[] = [
    {
      title: "Help",
      links: [
        { text: "Documentation", href: "#" },
        { text: "Generating boilerplates", href: "#" },
        { text: "Writing posts with mdx", href: "#" },
        { text: "Deploy to Vercel", href: "#" },
        { text: "Migrate blog from Ghost", href: "#" },
        { text: "Free for Open Source", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { text: "FAQ", href: "#" },
        { text: "Terms of Service", href: "#" },
        { text: "Privacy Policy", href: "#" },
        { text: "About Shipixen", href: "#" },
        { text: "Contact Support", href: "#" },
      ],
    },
    {
      title: "Product",
      links: [
        { text: "Try app", href: "#" },
        { text: "Pricing", href: "#" },
        { text: "Release Notes", href: "#" },
        { text: "Blog", href: "#" },
        { text: "All Features", href: "#" },
        { text: "Become an affiliate", href: "#" },
      ],
    },
    {
      title: "Tools",
      links: [
        { text: "Landing Page Components", href: "#" },
        { text: "Component Explorer", href: "#" },
        { text: "Pricing Page Generator", href: "#" },
        { text: "Cron Expression Viewer", href: "#" },
        { text: "Create step-by-step guides", href: "#" },
        { text: "Partners", href: "#" },
      ],
    },
  ];

  // Theme-based styling
  const bgColor = theme === "light" ? "bg-green-50" : "bg-gray-900";
  const textColor = theme === "light" ? "text-gray-700" : "text-gray-300";
  const headingColor = theme === "light" ? "text-gray-900" : "text-white";
  const hoverColor = theme === "light" ? "hover:text-purple-600" : "hover:text-purple-400";
  const borderColor = theme === "light" ? "border-gray-200" : "border-gray-700";
  const logoBackground = theme === "light" ? "bg-teal-400" : "bg-purple-900";

  return (
    <footer className={`${bgColor} transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start mb-8">
          {/* Logo and Description Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 pr-0 md:pr-8 mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <div className={`w-12 h-12 ${logoBackground} rounded-xl flex items-center justify-center mr-3`}>
                <div className="w-6 h-6 bg-teal-500 rounded-md"></div>
              </div>
              <span className={`text-2xl font-bold ${headingColor}`}>InviteLoop</span>
            </div>

            <p className={`${textColor} mb-6`}>
              Inviteloop React apps with an MDX blog in minutes. TypeScript, Shadcn UI and all components you need to build for your app, website, product or blog. SEO optimized, responsive and performant.
            </p>

            <p className={`${textColor} text-sm`}>
              Copyright © InviteLoop
            </p>
          </div>

          {/* Links Columns Section */}
          <div className="w-full md:w-2/3 lg:w-3/4 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {footerColumns.map((column, index) => (
              <div key={index} className="space-y-4">
                <h3 className={`font-medium ${headingColor}`}>{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className={`text-sm ${textColor} ${hoverColor} transition-colors duration-200`}
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section with Install/Docs/etc. */}
        <div className={`mt-12 pt-8 border-t ${borderColor}`}>
          <div className="text-center">
            <p className={`text-sm ${textColor}`}>© 2025 • Inviteloop</p>
          </div>
        </div>
      </div>
    </footer>
  );
}