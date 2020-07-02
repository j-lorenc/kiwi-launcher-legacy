import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from 'feather-icons/dist/icons/x.svg';

import Draggable from 'react-draggable';
import styles from './styles.module.scss';

class Modal extends Component<ModalProps> {
  private container: HTMLElement;

  constructor(props: ModalProps) {
    super(props);
    this.container = document.getElementById('modal-container') || document.createElement('div');
  }

  render(): React.ReactPortal {
    const activeModal = (
      <div
        className={styles.overlay}
        onClick={() => {
          this.props.onClose(false);
        }}
      >
        <Draggable handle={`.${styles.headerBar}`}>
          <div
            className={this.props.className}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div className={styles.headerBar}>
              <span />

              {this.props.title}

              <CloseIcon
                onClick={() => {
                  this.props.onClose(false);
                }}
              />
            </div>
            {this.props.children}
          </div>
        </Draggable>
      </div>
    );

    return ReactDOM.createPortal(this.props.active ? activeModal : <></>, this.container);
  }
}

export interface ModalProps {
  children?: ReactNode;
  active: boolean;
  className?: string;
  onClose: (flag: boolean) => void;
  title?: string;
}

export default Modal;
