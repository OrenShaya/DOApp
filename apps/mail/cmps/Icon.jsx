// src/components/Icon.jsx

const { ReactComponent } = React
import '../../../assets/css/apps/mail/cmps/icon-style.css'

// Import SVGs as React Components
import { ReactComponent as AddIcon } from '../../../assets/icons/add_000000_FILL0_wght400.svg'
import { ReactComponent as ArrowLeftIcon } from '../../../assets/icons/arrow_left_alt_000000_FILL0_wght400.svg'
import { ReactComponent as ArrowRightIcon } from '../../../assets/icons/arrow_right_alt_000000_FILL0_wght400.svg'
import { ReactComponent as AttachFileIcon } from '../../../assets/icons/attach_file_000000_FILL0_wght400.svg'
import { ReactComponent as CategoryIcon } from '../../../assets/icons/category_000000_FILL0_wght400.svg'
import { ReactComponent as CheckBoxIcon } from '../../../assets/icons/check_box000000_FILL0_wght400.svg'
import { ReactComponent as CheckBoxOutLineIcon } from '../../../assets/icons/check_box_outline_blank_000000_FILL0_wght400.svg'
import { ReactComponent as ChevronLeftIcon } from '../../../assets/icons/chevron_left_000000_FILL0_wght400.svg'
import { ReactComponent as ChevronRightIcon } from '../../../assets/icons/chevron_right_000000_FILL0_wght400.svg'
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete_000000_FILL0_wght400.svg'
import { ReactComponent as DraftIcon } from '../../../assets/icons/draft_000000_FILL0_wght400.svg'
import { ReactComponent as EditIcon } from '../../../assets/icons/edit_000000_FILL0_wght400.svg'
import { ReactComponent as ForwardIcon } from '../../../assets/icons/forward_000000_FILL0_wght400.svg'
import { ReactComponent as ForwardToInboxIcon } from '../../../assets/icons/forward_to_inbox_000000_FILL0_wght400.svg'
import { ReactComponent as InboxIcon } from '../../../assets/icons/inbox_000000_FILL0_wght400.svg'
import { ReactComponent as LabelIcon } from '../../../assets/icons/label_000000_FILL0_wght400.svg'
import { ReactComponent as MarkAsReadIcon } from '../../../assets/icons/mark_as_unread_000000_FILL0_wght400.svg'
import { ReactComponent as MoreVertIcon } from '../../../assets/icons/more_vert_000000_FILL0_wght400.svg'
import { ReactComponent as MoveToInboxIcon } from '../../../assets/icons/move_to_inbox_000000_FILL0_wght400.svg'
import { ReactComponent as RefreshIcon } from '../../../assets/icons/refresh_000000_FILL0_wght400.svg'
import { ReactComponent as ReplyIcon } from '../../../assets/icons/reply_000000_FILL0_wght400.svg'
import { ReactComponent as SendIcon } from '../../../assets/icons/send_000000_FILL0_wght400.svg'
import { ReactComponent as StarIcon } from '../../../assets/icons/star_000000_FILL0_wght400.svg'

// Import additional icons as needed

// Mapping of icon names to their respective components
const icons = {
  add: AddIcon,
  arrowLeft: ArrowLeftIcon,
  arrowRight: ArrowRightIcon,
  attachFile: AttachFileIcon,
  category: CategoryIcon,
  checkBox: CheckBoxIcon,
  checkBoxOutline: CheckBoxOutLineIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  delete: DeleteIcon,
  draft: DraftIcon,
  edit: EditIcon,
  forward: ForwardIcon,
  forwardToInbox: ForwardToInboxIcon,
  inbox: InboxIcon,
  label: LabelIcon,
  markAsRead: MarkAsReadIcon,
  moreVert: MoreVertIcon,
  moveToInbox: MoveToInboxIcon,
  refresh: RefreshIcon,
  reply: ReplyIcon,
  send: SendIcon,
  star: StarIcon,
}

export function Icon({ name, className, onClick, ...props }) {
  const SvgIcon = icons[name]

  if (!SvgIcon) {
    console.warn(`Icon "${name}" does not exist.`)
    return null
  }

  return <SvgIcon className={className} onClick={onClick} {...props} />
}
