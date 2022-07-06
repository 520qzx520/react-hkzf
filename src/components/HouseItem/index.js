import { BASE_URL } from "../../utils/url";
import './index.css'
export default function HouseItem({item,style,goHouseDetail}) {
  // console.log(item)
    // 处理字符串函数
  function handelStr(str, len) {
    return str.length > len ? str.substring(0, len) + '...' : str;
  }
  
  return (
    
    <div className='houseList-house' key={item?.houseCode} style={style} onClick={goHouseDetail}>
      <div className='houseList-house-img'>
        <img src={`${BASE_URL}${item?.houseImg}`} />
      </div>
      <div className='houseList-house-content'>
        <h3>{handelStr(item?.desc, 18)}</h3>
        <p className='title'>{item?.title}</p>
        <div className='spanall'>
          {item?.tags.map((tag) => (
            <span className='span1' key={tag}>
              <a key={tag}> {tag}</a>
            </span>
          ))}
        </div>

        <p className='price'>{item?.price}元/月</p>
      </div>
    </div>
  );
}
