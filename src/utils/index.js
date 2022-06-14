import axios from 'axios';
export const getCurrentCity = () => {
  const localCity = JSON.parse(localStorage.getItem('hkzf_city'))
  if(!localCity){
     return new Promise((resolve, reject) => {
    const curCity = new window.BMapGL.LocalCity();
    curCity.get(async (res) => {
      try {
        const { data: result } = await axios.get(
          `http://localhost:8080/area/info?name=${res.name}`,
        );
        localStorage.setItem('hkzf_city',JSON.stringify(result.body))
        resolve(result.body);
      } catch (error) {
        reject(error);
      }
    });
  });
  }
 return Promise.resolve(localCity)
};
