// Custom type scale from main.css: tailwind-merge must know these are
// font sizes, otherwise `text-section` would be taken for a color and
// drop `text-highlighted` when Nuxt UI merges classes.
const fontSizes = ['caption', 'small', 'ui', 'reading', 'heading', 'section', 'title', 'display']

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'accent',
      neutral: 'slate'
    },
    tv: {
      twMergeConfig: {
        extend: {
          classGroups: {
            'font-size': [{ text: fontSizes }]
          }
        }
      }
    },
    // Note body typography ("Index" design system): Newsreader headings one
    // step below the page title, reading line height, sunken code blocks.
    prose: {
      h2: {
        slots: {
          base: 'font-serif text-section font-medium'
        }
      },
      h3: {
        slots: {
          base: 'font-serif text-heading font-medium'
        }
      },
      h4: {
        slots: {
          base: 'font-sans text-ui font-semibold'
        }
      },
      p: {
        base: 'leading-[inherit]'
      },
      li: {
        base: 'leading-[inherit]'
      },
      a: {
        base: 'font-normal'
      },
      code: {
        base: 'text-[0.85em] font-normal py-0 rounded-sm'
      },
      // Code keeps its line breaks and scrolls sideways instead of wrapping.
      pre: {
        slots: {
          base: 'whitespace-pre'
        }
      },
      blockquote: {
        base: 'border-s-2 not-italic text-muted'
      },
      table: {
        slots: {
          root: 'font-sans'
        }
      }
    }
  }
})
