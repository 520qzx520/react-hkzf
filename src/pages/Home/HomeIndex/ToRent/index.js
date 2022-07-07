import NavHeader from '../../../../components/NavHeader';
import {
  List,
  Input,
  Form,
  Picker,
  ImageUploader,
  Selector,
  Button,
  Toast
} from 'antd-mobile';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import './index.css';
import {
  BankcardOutline,
  CouponOutline,
  DeleteOutline,
  CollectMoneyOutline,
  LoopOutline,
  TruckOutline,
  FaceRecognitionOutline,
  TransportQRcodeOutline,
} from 'antd-mobile-icons';
import api from '../../../../api/Api';
import { getToken } from '../../../../utils/power';
export default function ToRent() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  useEffect(() => {
    const id = params.get('id');
    setcommunity(params.get('name'));
    setAllData((item) => {
      return { ...item, id: id };
    });
  }, []);
  // 小区名称
  const [community, setcommunity] = useState('');
  // 选中的传给服务器的值（id）
  const [allData, setAllData] = useState({
    // 小区id
    id: '',
    // 图片
    fileList: [],
    // 房屋标题
    title: '',
    // 价格
    price: '',
    // 房屋类型
    roomType: '',
    // 面积
    size: '',
    // 朝向
    oriented: '',
    // 楼层
    floor: '',
    // 房屋配套
    supporting: '',
    // 房屋描述
    description: '',
  });
  // 选中的值（value）
  const [selectData, setSelect] = useState({
    // 房屋类型
    roomType: '',
    // 朝向
    oriented:'',
    // 楼层
    floor: '',
  });
  // picker展示和隐藏
  const [visible, setVisible] = useState(false);
  const [pickerValue, setPickerValue] = useState('');
  // 设置picker展示数据
  const [showData, setShowData] = useState([]);
  // 图片
  const [fileList, setFileList] = useState([]);
  //   房屋配置
  const [houseMatings, setHouseMating] = useState([]);
  const houseMating = [
    {
      id: 'yg',
      value: '衣柜',
      label: [
        <div>
          <BankcardOutline fontSize={20} />
          <div>衣柜</div>
        </div>,
      ],
    },
    {
      id: 'xyj',
      value: '洗衣机',
      label: [
        <div>
          <DeleteOutline fontSize={20} />
          <div>洗衣机</div>
        </div>,
      ],
    },
    {
      id: 'kt',
      value: '空调',
      label: [
        <div>
          <CollectMoneyOutline fontSize={20} />
          <div>空调</div>
        </div>,
      ],
    },
    {
      id: 'trq',
      value: '天然气',
      label: [
        <div>
          <LoopOutline fontSize={20} />
          <div>天然气</div>
        </div>,
      ],
    },
    {
      id: 'vx',
      value: '冰箱',
      label: [
        <div>
          <TruckOutline fontSize={20} />
          <div>冰箱</div>
        </div>,
      ],
    },
    {
      id: 'ds',
      value: '电视',
      label: [
        <div>
          <FaceRecognitionOutline fontSize={20} />
          <div>电视</div>
        </div>,
      ],
    },
    {
      id: 'rsq',
      value: '热水器',
      label: [
        <div>
          <TransportQRcodeOutline fontSize={20} />
          <div>热水器</div>
        </div>,
      ],
    },
    {
      id: 'sf',
      value: '沙发',
      label: [
        <div>
          <CouponOutline fontSize={20} />
          <div>沙发</div>
        </div>,
      ],
    },
  ];
  // 楼层
  const floorData = [
    [
      { label: '高楼层', value: 'FLOOR|1' },
      { label: '中楼层', value: 'FLOOR|2' },
      { label: '低楼层', value: 'FLOOR|3' },
    ],
  ];
  // 房屋类型
  const roomTypeData = [
    [
      { label: '一室', value: 'ROOM|d4a692e4-a177-37fd' },
      { label: '二室', value: 'ROOM|d1a00384-5801-d5cd' },
      { label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2' },
      { label: '四室', value: 'ROOM|ce2a5daa-811d-2f49' },
      { label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f' },
    ],
  ];
  // 朝向
  const orientedData = [
    [
      { label: '东', value: 'ORIEN|141b98bf-1ad0-11e3' },
      { label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e' },
      { label: '南', value: 'ORIEN|61e99445-e95e-7f37' },
      { label: '北', value: 'ORIEN|caa6f80b-b764-c2df' },
      { label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977' },
      { label: '东北', value: 'ORIEN|67ac2205-7e0f-c057' },
      { label: '西南', value: 'ORIEN|2354e89e-3918-9cef' },
      { label: '西北', value: 'ORIEN|80795f1a-e32f-feb9' },
    ],
  ];
  // 进入搜索页面
  const getName = () => {
    navigate('/torentsearch');
  };
  // 点击进入选择页面
  function handleClick(type) {
    setVisible(true);
    switch (type) {
      case 'roomType':
        setPickerValue('roomType');
        setShowData([...floorData]);
        break;

      case 'floor':
        setPickerValue('floor');
        setShowData([...roomTypeData]);
        break;
      case 'oriented':
        setPickerValue('oriented');
        setShowData([...orientedData]);
        break;

      default:
        break;
    }
  }
  // 选择确认
  function onConfirm(type, arr) {
    console.log(type, arr);
    setSelect((item) => {
      let value = arr.items[0].label;
     
      return { ...item, [type]:value };
    });
  }

  //   房屋配置数据
  function getHouseMating(type, data) {
    const value = data.join('|');
    setAllData((item) => {
      return { ...item, [type]: value };
    });
  }

  //   统一处理、设置选择、输入的值
  const getSelectData = (name, value) => {
    setAllData((item) => {
      return { ...item, [name]: value };
    });
  };

  //   上传图片
  // 图片处理要求返回一个promise对象
  const Upload = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        file.url = reader.result;
        // 存储图片 ...allData.fileList 保留上一次的图片
        setAllData((item) => {
          return { ...item, ['fileList']: [...allData.fileList, file] };
        });
        resolve(file);
      };
    });
  };

  //   取消按钮
  const closeBtn = () => {};
  //   确定按钮
  const sureBtn = () => {
    addImg();
  };
  //发送请求，存储图片到服务器
  const addImg = async () => {
    const { fileList } = allData;
    let form = new FormData();
    let houseImg = '';
    if (fileList.length > 0) {
      fileList.forEach((item) => {
        form.append('file', item);
      });
      const res = await api.addImgToInt(form, {
        // headers 会报错，改成data即可
        data: {
          'Content-Type ': 'multipart/form-data',
        },
      });
      houseImg = res.data.body.join('|');
      publishHouse( houseImg);
      console.log(houseImg);
    }
  };
  // 删除图片
  const Delete = (data) => {
    const newList = allData.fileList.filter((item) => {
      console.log(item);
      return data !== item;
    });
    // 重新设置图片
    setAllData((item) => {
      return { ...item, ['fileList']: [...newList] };
    });
  };

  // 发布房源
  const publishHouse = async (houseImg) => {
    let params = {
      title: allData.title,
      description: allData.description,
      houseImg: houseImg,
      oriented: allData.oriented,
      supporting: allData.supporting,
      price: allData.price,
      roomType:  allData.floor,
      size: allData.size,
      floor:allData.roomType,
      community: allData.id,
    };
    try {
       const res = await api.publishHouse( params);  Toast.show({
          content: '发布成功',
          duration: 1000,
        });
    } catch (error) {
        Toast.show({
          content: '不行哦，稍后请重试',
          duration: 1000,
        });
     
    }
   
    
  };
  return (
    <div className='ToRent'>
      {/* 头部  */}
      <NavHeader>去出租</NavHeader>
      {/* 弹出的picker选择器 */}
      <Picker
        columns={showData}
        visible={visible}
        value={[pickerValue]}
        onClose={() => {
          setVisible(false);
        }}
        onConfirm={(data, arr) => onConfirm(pickerValue, arr)}
        onSelect={(val, arr) =>
          getSelectData(pickerValue, val[0], arr, allData[pickerValue])
        }
      ></Picker>
      {/* list列表 */}
      <List mode='card' header='房源信息'>
        <List.Item
          extra={community ? community : '请输入小区名称'}
          onClick={getName}
        >
          小区名称
        </List.Item>
        <Form layout='horizontal'>
          <Form.Item
            label='租 金'
            extra={<div className='extraPart'>￥/月</div>} 
          >
            <Input
              placeholder='请输入租金'
              clearable
              value={allData.price}
              onChange={(val) => getSelectData('price', val)}
         
            />
          </Form.Item>
          <Form.Item
            label='建筑面积'
            extra={<div className='extraPart'>平方米</div>} 
          >
            <Input
              placeholder='请输入租金'
              clearable
              value={allData.size}
              onChange={(val) => getSelectData('size', val)}
           
            />
          </Form.Item>
        </Form>
        <List.Item
          extra={selectData.roomType ? selectData.roomType : '请选择'}
          onClick={() => handleClick('roomType')}
        >
          户型
        </List.Item>
        <List.Item
          extra={selectData.floor ? selectData.floor : '请选择'}
          onClick={() => handleClick('floor')}
        >
          所在楼层
        </List.Item>
        <List.Item
          extra={selectData.oriented ? selectData.oriented : '请选择'}
          onClick={() => handleClick('oriented')}
        >
          朝向
        </List.Item>
        <p> 房屋标题</p>
        <Form.Item>
          <Input
            placeholder='请输入房屋描述（99个字内）'
            clearable
            value={allData.title}
            onChange={(val) => getSelectData('title', val)}
          />
        </Form.Item>
        <p> 房屋图像</p>
        <List.Item>
          <ImageUploader
            value={allData.fileList}
            accept={'image/jpeg' || ' image/jpg' || 'image/gif' || 'image/png'}
            upload={Upload}
            multiple={true}
            onDelete={Delete}
          />
        </List.Item>
        <p>房屋配套</p>
        <List.Item>
          <Selector
            columns={4}
            options={houseMating}
            multiple={true}
            // value={allData.supporting}
            onChange={(val) => getHouseMating('supporting', val)}
          />
        </List.Item>
        <p> 房屋描述</p>
        <Form.Item>
          <div style={{ height: '100px' }}>
            <Input
              placeholder='请输入房屋描述（99个字内）'
              clearable
              value={allData.description}
              onChange={(val) => getSelectData('description', val)}
            />
          </div>
        </Form.Item>
      </List>
      <div className='Item-Btn'>
        <Button size='small' shape='rectangular' onClick={closeBtn}>
          取消
        </Button>
        <Button
          color='success'
          shape='rectangular'
          onClick={sureBtn}
          size='small'
       
        >
          确定
        </Button>
      </div>
    </div>
  );
}
