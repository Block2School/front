import axios from 'axios';

export const getAPI = async (url: string) => {
  try {
    let response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
    });
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const postAPI = async (url: string, data: any) => {
  try {
    let response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
    });
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const putAPI = async (url: string, data: any) => {
  try {
    let response = await axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
    });
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
}

export const patchAPI = async (url: string, data: any) => {
  try {
    let response = await axios.patch(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
    });
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
}

export const deleteAPI = async (url: string) => {
  try {
    let response = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
    });
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
}