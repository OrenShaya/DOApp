// cmps?Icon.jsx

// mapping of icon names to their filepaths
const fileNames = {
  add: 'add_000000_FILL0_wght400.svg',
  arrowLeft: 'arrow_left_alt_000000_FILL0_wght400.svg',
  arrowRight: 'arrow_right_alt_000000_FILL0_wght400.svg',
  attachFile: 'attach_file_000000_FILL0_wght400.svg',
  category: 'category_000000_FILL0_wght400.svg',
  checkBox: 'check_box000000_FILL0_wght400.svg',
  checkBoxOutline: 'check_box_outline_blank_000000_FILL0_wght400.svg',
  chevronLeft: 'chevron_left_000000_FILL0_wght400.svg',
  chevronRight: 'chevron_right_000000_FILL0_wght400.svg',
  delete: 'delete_000000_FILL0_wght400.svg',
  draft: 'draft_000000_FILL0_wght400.svg',
  edit: 'edit_000000_FILL0_wght400.svg',
  forward: 'forward_000000_FILL0_wght400.svg',
  forwardToInbox: 'forward_to_inbox_000000_FILL0_wght400.svg',
  inbox: 'inbox_000000_FILL0_wght400.svg',
  label: 'label_000000_FILL0_wght400.svg',
  labelImportant: 'label_important_000000_FILL0_wght400.svg',
  markAsRead: 'mark_as_unread_000000_FILL0_wght400.svg',
  moreVert: 'more_vert_000000_FILL0_wght400.svg',
  moveToInbox: 'move_to_inbox_000000_FILL0_wght400.svg',
  refresh: 'refresh_000000_FILL0_wght400.svg',
  reply: 'reply_000000_FILL0_wght400.svg',
  send: 'send_000000_FILL0_wght400.svg',
  star: 'star_000000_FILL0_wght400.svg',
  starYellow: 'star_F4B400_FILL1_wght400.svg',
  setting: 'settings_000000_FILL0_wght400.svg',
}

function Icon({ name, className = '', onClick, ...props }) {
  const fileName = fileNames[name]
  if (!fileName) {
    console.warn(`Icon: name "${name}" does not exist in fileNames mapping`)
    return null
  }

  const svgPath = `../assets/icons/${fileName}`

  return (
    <img
      src={svgPath}
      alt={name}
      className={`icon-style ${className}`}
      onClick={onClick}
      {...props}
    />
  )
}

export default Icon
