import { RequireOnlyOne } from "@/types/generic";

export interface IModal {
  overlay?: "dark" | "light";
  /**
   * @property overlay
   * @type string
   * @default "white"
   * @description it determines the overlay Type
   * @example <Modal overlay={dark} />
   */
  show: boolean;
  /**
   * @property title
   * @type React.ReactNode
   * @optional
   * @default ""
   * @description This is the title heading of the of the modal body
   * @example <Modal title={<p>Modal title</p>}  /
   */
  title?: React.ReactNode;
  /**
   * @property body
   * @type React.ReactNode
   * @optional
   * @default ""
   * @description This is the content displayed in the modal body
   * @example <Modal title={<p>Modal title</p>} body={<div><h3>Modal content</h3><p>Lorem ipsum dolor sit amet iti</p></div>}   />
   */
  body?: React.ReactNode;
  /**
   * @property children
   * @type React.ReactNode
   * @optional
   * @default ""
   * @description This is the content to be rendered as the child of the modal body
   * @example
   * <Modal title={<p>Modal title</p>}>
   * 		<div>
   * 			<h3>Modal content</h3>
   * 			<p>Lorem ipsum dolor sit amet iti</p>
   * 		</div>
   * 	</Modal>
   */
  children?: React.ReactNode;
  /**
   * @property cancelButton
   * @type React.ReactNode
   * @optional
   * @default ""
   * @description This is the content to be rendered as the close/cancel button
   * @example
   * <Modal title={<p>Modal title</p>} cancelButton={<p>Close button</p>}>
   * 		<div>
   * 			<h3>Modal content</h3>
   * 			<p>Lorem ipsum dolor sit amet iti</p>
   * 		</div>
   * 	</Modal>
   */
  cancelButton?: React.ReactNode;
  /**
   * @property actionButton
   * @type React.ReactNode
   * @optional
   * @default ""
   * @description This is the content to be rendered as an action button
   * @example
   * <Modal title={<p>Modal title</p>} actionButton={<p>Edit button<p>}>
   * 		<div>
   * 			<h3>Modal content</h3>
   * 			<p>Lorem ipsum dolor sit amet iti</p>
   * 		</div>
   * 	</Modal>
   */
  actionButton?: React.ReactNode;
  /**
   * @property onCloseAction
   * @default ""
   * @description A callback function to be called when an action button is clicked
   * @example
   * <Modal title={<p>Modal title</p>} onCloseAction={() => consoleLog("Close Action Initiated")}>
   * 		<div>
   * 			<h3>Modal content</h3>
   * 			<p>Lorem ipsum dolor sit amet iti</p>
   * 		</div>
   * 	</Modal>
   */
  onCloseAction: () => void;
  /**
   * @property onAction
   * @default ""
   * @optional
   * @description A callback function to be called when the action button is clicked
   * @example
   * <Modal title={<p>Modal title</p>} onAction={() => consoleLog("Action button triggered")}>
   * 		<div>
   * 			<h3>Modal content</h3>
   * 			<p>Lorem ipsum dolor sit amet iti</p>
   * 		</div>
   * 	</Modal>
   */
  onAction?: () => void;
  /**
   * @property actionLoading
   * @default ""
   * @type boolean
   * @optional
   * @description This shows a loading effect when it is set to true
   * @example
   * <Modal title={<p>Modal title</p>} actionLoading={true}>
   * 		<div>
   * 			<h3>Modal content</h3>
   * 			<p>Lorem ipsum dolor sit amet iti</p>
   * 		</div>
   * 	</Modal>
   */
  actionLoading?: boolean;
  /**
   * @property actionDisabled
   * @default ""
   * @type boolean
   * @optional
   * @description This disables the modal when set to true
   * @example
   * <Modal title={<p>Modal title</p>} actionDisabled={true}>
   * 		<div>
   * 			<h3>Modal content</h3>
   * 			<p>Lorem ipsum dolor sit amet iti</p>
   * 		</div>
   * 	</Modal>
   */
  actionDisabled?: boolean;
  /**
   * @property cancelLoading
   * @default ""
   * @type boolean
   * @optional
   * @description This removes the default disabled effect
   * @example
   * <Modal title={<p>Modal title</p>} cancelDisabled={true}>
   * 		<div>
   * 			<h3>Modal content</h3>
   * 			<p>Lorem ipsum dolor sit amet iti</p>
   * 		</div>
   * 	</Modal>
   */
  cancelDisabled?: boolean;
  /**
   * @property size
   * @default ""
   * @optional
   * @type string
   * @optional
   * @description This describes the size of the modal
   * @example
   * <Modal title={<p>Modal title</p>} size={md}>
   * 		<div>
   * 			<h3>Modal content</h3>
   * 			<p>Lorem ipsum dolor sit amet iti</p>
   * 		</div>
   * 	</Modal>
   */
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "full";
  actionButtonVariant?:
    | "primary"
    | "info"
    | "warning"
    | "danger"
    | "white"
    | "success";
  className?: string;
  showCloseIcon?: boolean;
}

export type IModalProps = RequireOnlyOne<IModal, "children" | "body">;
