import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  dark?: boolean;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
  dark = false,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        centered && 'text-center',
        className
      )}
    >
      {/* Orange accent line */}
      <div
        className={cn(
          'accent-line mb-6',
          centered && 'mx-auto'
        )}
      />

      {/* Uppercase label */}
      {label && (
        <span className="editorial-label mb-3 inline-block">
          {label}
        </span>
      )}

      {/* Title */}
      <h2
        className={cn(
          'editorial-heading text-display-md md:text-display-lg',
          dark ? 'text-ivory' : 'text-navy',
          centered ? 'max-w-3xl mx-auto' : 'max-w-2xl'
        )}
      >
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p
          className={cn(
            'mt-4 text-lg leading-relaxed',
            dark ? 'text-muted' : 'text-navy/60',
            centered ? 'max-w-2xl mx-auto' : 'max-w-xl'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
