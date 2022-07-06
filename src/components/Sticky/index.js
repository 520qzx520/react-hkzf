import { useEffect, useRef } from 'react';
import './index.css';

export default function Sticky({ children,height }) {
  const placeholder = useRef(null);
  const content = useRef(null);
  useEffect(() => {
    window.addEventListener('scroll', handelScroll);
    // 取消监听
    return () => {
      // 在组件卸载前执行
      // 在此做一些收尾工作, 比如清除定时器/取消订阅等
      console.log('取消了监听');
      window.removeEventListener('scroll', handelScroll);
    };
  }, []);
  // 监听scroll事件
  const handelScroll = () => {
    const placeholderEL = placeholder.current;
    const contentEl = content.current;
    const { top } = placeholderEL.getBoundingClientRect();
    if (top < 0) {
      contentEl.classList.add('fixed');
      placeholderEL.style.heigth = `${height}px`;
    } else {
      contentEl.classList.remove('fixed');
      placeholderEL.style.heigth = 0;
    }
  };
  return (
    <>
      {/* 占位元素 */}
      <div ref={placeholder}></div>
      {/* 内容元素 */}
      <div ref={content}>{children}</div>
    </>
  );
}
