/**
 * The Storyblok "Block Library" for this site, as code.
 * `npm run storyblok:setup` pushes these into the space (creates or updates them).
 * Field names here must match what the React blocks in components/blocks read.
 */

const text = (display_name, opts = {}) => ({ type: 'text', display_name, ...opts })
const textarea = (display_name, opts = {}) => ({ type: 'textarea', display_name, ...opts })
const image = (display_name, opts = {}) => ({ type: 'asset', display_name, filetypes: ['images'], ...opts })
const link = (display_name, opts = {}) => ({
  type: 'multilink', display_name, allow_target_blank: false, email_link_type: true, ...opts,
})
const option = (display_name, options, default_value) => ({
  type: 'option', display_name, options: options.map(([name, value]) => ({ name, value })), default_value,
})
const bloks = (display_name, whitelist, opts = {}) => ({
  type: 'bloks', display_name, restrict_components: true, component_whitelist: whitelist, ...opts,
})

/** Add `pos` so fields appear in the order written. */
const ordered = (schema) =>
  Object.fromEntries(Object.entries(schema).map(([k, v], i) => [k, { pos: i, ...v }]))

const ICONS = [
  ['Compass — funnel / direction', 'compass'],
  ['Beaker — science / research', 'beaker'],
  ['Handshake — partnership', 'handshake'],
  ['Rocket — launch / scale', 'rocket'],
  ['Coins — capital', 'coins'],
  ['Anchor — harbour', 'anchor'],
]

export const SECTION_TYPES = [
  'hero', 'audience_hero', 'image_hero', 'feature_grid', 'stats', 'text_image', 'logo_wall', 'cta',
]

export const components = [
  /* ---------------- small nested items (only used inside sections) ---------------- */
  {
    name: 'nav_link', display_name: 'Link', is_nestable: true, is_root: false, preview_field: 'label',
    schema: ordered({ label: text('Label', { required: true, max_length: 40 }), link: link('Links to', { required: true }) }),
  },
  {
    name: 'footer_column', display_name: 'Footer column', is_nestable: true, is_root: false, preview_field: 'title',
    schema: ordered({
      title: text('Title', { required: true, max_length: 30 }),
      links: bloks('Links', ['nav_link'], { maximum: 6 }),
    }),
  },
  {
    name: 'hero_button', display_name: 'Button', is_nestable: true, is_root: false, preview_field: 'label',
    schema: ordered({
      label: text('Label', { required: true, max_length: 28 }),
      link: link('Links to', { required: true }),
      style: option('Style', [['Solid (white)', 'solid'], ['Outline', 'outline']], 'solid'),
    }),
  },
  {
    name: 'audience_card', display_name: 'Audience card', is_nestable: true, is_root: false, preview_field: 'label',
    schema: ordered({
      label: text('Label', { required: true, max_length: 30 }),
      description: text('Description', { max_length: 70 }),
      link: link('Links to', { required: true }),
      image: image('Photo', { description: 'Falls back to the icon if empty.' }),
      icon: option('Fallback icon', [
        ['Student — graduation cap', 'student'], ['Investor — chart', 'investor'], ['Startup — rocket', 'startup'],
        ['Company — building', 'company'], ['Researcher — beaker', 'researcher'],
      ], 'student'),
    }),
  },
  {
    name: 'feature_card', display_name: 'Feature card', is_nestable: true, is_root: false, preview_field: 'title',
    schema: ordered({
      title: text('Title', { required: true, max_length: 60 }),
      body: textarea('Text', { max_length: 260 }),
      icon: option('Icon', ICONS, 'compass'),
      link: link('Optional link'),
    }),
  },
  {
    name: 'stat_item', display_name: 'Stat', is_nestable: true, is_root: false, preview_field: 'value',
    schema: ordered({
      value: text('Number', { required: true, max_length: 12, description: 'e.g. 120+' }),
      label: text('Label', { required: true, max_length: 50 }),
    }),
  },
  {
    name: 'logo_item', display_name: 'Logo', is_nestable: true, is_root: false, preview_field: 'name',
    schema: ordered({
      name: text('Name', { required: true }),
      image: image('Logo', { required: true }),
      link: link('Website (optional)'),
    }),
  },

  /* ---------------- sections (what editors add to a page) ---------------- */
  {
    name: 'hero', display_name: 'Hero', is_nestable: true, is_root: false, preview_field: 'heading',
    schema: ordered({
      eyebrow: text('Eyebrow (small label above heading)', { max_length: 40 }),
      heading: text('Heading', { required: true, max_length: 70 }),
      heading_mark: text('Highlighted words (blue box)', { max_length: 40 }),
      subheading: textarea('Subheading', { max_length: 240 }),
      buttons: bloks('Buttons', ['hero_button'], { maximum: 2 }),
      image: image('Image'),
    }),
  },
  {
    name: 'audience_hero', display_name: 'Hero — audience picker', is_nestable: true, is_root: false, preview_field: 'question',
    schema: ordered({
      eyebrow: text('Eyebrow', { max_length: 40 }),
      question: text('Question', { required: true, max_length: 60, default_value: 'Wer besucht uns heute?' }),
      subtext: textarea('Subtext', { max_length: 160 }),
      cards: bloks('Audience cards', ['audience_card'], { minimum: 2, maximum: 4, description: 'Three looks best.' }),
    }),
  },
  {
    name: 'image_hero', display_name: 'Hero — image', is_nestable: true, is_root: false, preview_field: 'heading',
    schema: ordered({
      eyebrow: text('Eyebrow', { max_length: 40 }),
      heading: text('Heading', { max_length: 70 }),
      image: image('Image', { required: true }),
    }),
  },
  {
    name: 'feature_grid', display_name: 'Feature grid', is_nestable: true, is_root: false, preview_field: 'heading',
    schema: ordered({
      eyebrow: text('Eyebrow', { max_length: 40 }),
      heading: text('Heading', { required: true, max_length: 80 }),
      intro: textarea('Intro', { max_length: 280 }),
      items: bloks('Cards', ['feature_card'], { minimum: 2, maximum: 4 }),
    }),
  },
  {
    name: 'stats', display_name: 'Stats band', is_nestable: true, is_root: false, preview_field: 'heading',
    schema: ordered({
      heading: text('Heading', { max_length: 80 }),
      items: bloks('Stats', ['stat_item'], { minimum: 2, maximum: 4 }),
    }),
  },
  {
    name: 'text_image', display_name: 'Text + image', is_nestable: true, is_root: false, preview_field: 'heading',
    schema: ordered({
      eyebrow: text('Eyebrow', { max_length: 40 }),
      heading: text('Heading', { required: true, max_length: 80 }),
      body: textarea('Text', { max_length: 700 }),
      bullets: textarea('Bullet points', { description: 'One per line, up to 5.' }),
      image: image('Image'),
      image_side: option('Image position', [['Right', 'right'], ['Left', 'left']], 'right'),
      background: option('Background', [['White', 'white'], ['Light grey', 'surface']], 'white'),
    }),
  },
  {
    name: 'logo_wall', display_name: 'Partner logos', is_nestable: true, is_root: false, preview_field: 'heading',
    schema: ordered({
      eyebrow: text('Eyebrow', { max_length: 40 }),
      heading: text('Heading', { max_length: 80 }),
      logos: bloks('Logos', ['logo_item'], { minimum: 3 }),
      scroll: { type: 'boolean', display_name: 'Scroll automatically', default_value: true },
    }),
  },
  {
    name: 'cta', display_name: 'Call to action', is_nestable: true, is_root: false, preview_field: 'heading',
    schema: ordered({
      eyebrow: text('Eyebrow', { max_length: 40 }),
      heading: text('Heading', { required: true, max_length: 80 }),
      body: textarea('Text', { max_length: 240 }),
      button_label: text('Button label', { max_length: 28 }),
      button_link: link('Button link'),
    }),
  },

  /* ---------------- content types (one per story) ---------------- */
  {
    name: 'page', display_name: 'Page', is_root: true, is_nestable: false,
    schema: ordered({
      body: bloks('Sections', SECTION_TYPES, { description: 'Top to bottom. Drag to reorder.' }),
      seo_title: text('SEO title', { max_length: 60, description: 'Browser tab & Google. Empty = story name.' }),
      seo_description: textarea('SEO description', { max_length: 160 }),
      'tab-seo': { type: 'tab', display_name: 'SEO', keys: ['seo_title', 'seo_description'] },
    }),
  },
  {
    name: 'site_settings', display_name: 'Site settings', is_root: true, is_nestable: false,
    schema: ordered({
      nav: bloks('Main menu', ['nav_link'], { maximum: 5 }),
      header_button_label: text('Header button label', { max_length: 20 }),
      header_button_link: link('Header button link'),
      footer_tagline: textarea('Footer text', { max_length: 160 }),
      address: textarea('Address', { description: 'One line per row.' }),
      footer_columns: bloks('Footer columns', ['footer_column'], { maximum: 3 }),
      legal_links: bloks('Legal links (bottom bar)', ['nav_link']),
      copyright: text('Copyright name', { description: 'The year is added automatically.' }),
      site_title: text('Site title (SEO default)', { max_length: 60 }),
      site_description: textarea('Site description (SEO default)', { max_length: 160 }),
      'tab-footer': {
        type: 'tab', display_name: 'Footer',
        keys: ['footer_tagline', 'address', 'footer_columns', 'legal_links', 'copyright'],
      },
      'tab-seo': { type: 'tab', display_name: 'SEO defaults', keys: ['site_title', 'site_description'] },
    }),
  },
]
