interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({ title, subtitle, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={`mb-10 sm:mb-14 ${align === 'center' ? 'text-center' : ''}`}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-3 sm:mb-4 text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-[#a1a1a6] max-w-2xl mx-auto leading-relaxed text-balance">
          {subtitle}
        </p>
      )}
    </div>
  );
}
