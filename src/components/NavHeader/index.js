import React from "react"
import { useNavigate } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import './index.css'
//导入校验props
import PropTypes from 'prop-types'
//参数结构 
export default function NavHeader({children,onBack,rightContent}){ 
  
    const navigate = useNavigate();
    function DefaultBack() {
        navigate(-1);
      }
     
    return(
        <NavBar back='返回' className='NavHeader' onBack={onBack||DefaultBack} right={rightContent}>
            {/* 参数解构后使用 */}
            {children}
        </NavBar>
    )
}
//校验
NavHeader.propTypes = {
    // children:PropTypes.string.isRequired,
    onBack : PropTypes.func
  }