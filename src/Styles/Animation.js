import { keyframes } from "styled-components";

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const simpleSlideIn = keyframes`
  0% {
    opacity: 0; transform: translate3d(0, 2%, 0);
  }
  100% {
    opacity: 1;  transform: translateZ(0);
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const slideIn = keyframes`
 0% {
      opacity: 0;
      transform: translate3d(0, 10%, 0);
  }
  to {
      opacity: 1;
      transform: translateZ(0);
  }
`;

export const fadeInSidebar = keyframes`
    from {
      opactiy: 0;
      left: -100px;
    }

    to {
      opactiy: 1;
      top: 0;
    }
`;
