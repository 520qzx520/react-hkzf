import { Popup, CapsuleTabs, Button , Selector, } from 'antd-mobile';
import { useState, useEffect } from 'react';
import './index.css';
export default function FilterMore({ closeFilter, visible1, filterMoreData,childrenMoreData }) {
  const [roomType,setRoomType] = useState([])
  const [floor,setFloor] = useState([])
  const [oriented,setOriented] = useState([])
  const [characteristic,setCharacteristic] = useState([])
  // 用于判断选择类型
  let type = {
    roomType:'roomType',
    floor:'floor',
    oriented:'oriented',
    characteristic:'characteristic'
  }
  //   关闭筛选
  function colseFilterMore() {
    // 关闭下来菜单
    closeFilter();
    // setVisible(true);
  }

  //   取消按钮，并关闭下来菜单
  function closeBtn() {
    closeFilter();
  }
  //   确定按钮，并关闭下拉菜单
  function sureBtn() {
     // 通过函数传递数据给父组件
   closeFilter();
    childrenMoreData([...roomType,...floor,...oriented,...characteristic])
  }

  // 选择标签的回调
  function change(value,type){
   switch (type) {
     case 'roomType':
      setRoomType([...value])
   
       break;
       case 'floor':
        setFloor([...value])
       
      break;
      case 'oriented':
        setOriented([...value])
       
      break;
      case 'characteristic':
        setCharacteristic([...value])
       
      break;

     default:
       break;
   }
  
  }

 

  
 

  return (
    <div className='FilterMore'>
      <Popup
        visible={visible1}
        onMaskClick={colseFilterMore}
        position='right'
        bodyStyle={{ width: '70vw' }}
      
        // getContainer={()=>document.querySelector('.LookingRoom')}
      >
        <div className='FilterMore_default'>
          <h2>户型</h2>
            <Selector
          options={filterMoreData?.roomType||[]}
          
          columns={3}
          multiple = {true}
          onChange={(arr) => change(arr, type.roomType)}
        />
        </div>
        <div className='FilterMore_default'>
          <h2>朝向</h2>
          <Selector
          columns={2}
          multiple = {true}
          options={filterMoreData?.oriented||[]}
          
          onChange={(arr) => change(arr,type.oriented)}
        />
        </div>
        <div className='FilterMore_default'>
          <h2>楼层</h2>
          <Selector
          columns={2}
          multiple = {true}
          options={filterMoreData?.floor||[]}
          
           onChange={(arr) => change(arr,type.floor)}
        />
        </div>
        <div className='FilterMore_default'>
          <h2>房屋亮点</h2>
          <Selector
          columns={2}
          multiple = {true}
          options={filterMoreData?.characteristic||[]}
          
          onChange={(arr) => change(arr,type.characteristic)}
        />
        </div>
        <div className='FilterMore-Item-Btn'>
          <Button size='small' shape='rectangular' onClick={closeBtn}>
            取消
          </Button>
          <Button color='success'  shape='rectangular' onClick={sureBtn} size='small'>
            确定
          </Button>
        </div>
      </Popup>
    </div>
  );
}
