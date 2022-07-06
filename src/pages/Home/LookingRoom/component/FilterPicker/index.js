import { PickerView, Button, CascaderView } from 'antd-mobile';
import './index.css';
import { useEffect, useState } from 'react';

export default function FilterPicter({ closeFilter, filterData, type,childrenData }) {
  const [allData, setAllData] = useState([]);
  
  function change(value) {
    setAllData([...value])
   
  }
  
  //   取消按钮，并关闭下来菜单
  function closeBtn() {
    closeFilter();
  }
  //   确定按钮，并关闭下拉菜单
  function sureBtn() {
    // console.log(areaData,rentData,wayData)
    closeFilter();
    childrenData(allData,type)
  }
  return (
    <div className='FilterPicter'>
      {/* // 选择项的值 value */}
      <CascaderView
        options={filterData}
        onChange={(data) => {
          change(data, type);
        }}
        //  key={type}
      />
      <div className='Item-Btn'>
        <Button size='small' shape='rectangular' onClick={closeBtn}>
          取消
        </Button>
        <Button color='success' shape='rectangular' onClick={sureBtn} size='small'>
          确定
        </Button>
      </div>
    </div>
  );
}
