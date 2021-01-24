import fetch from 'cross-fetch';
import * as types from '../constants/actionTypes';

const getBlocksDataStart = (node) => {
  return {
    type: types.GET_BLOCKS_DATA_START,
    node
  };
};

const getBlocksDataSuccess = (node, res) => {
  return {
    type: types.GET_BLOCKS_DATA_SUCCESS,
    node,
    res
  };
};

const getBlocksDataFailure = node => {
  return {
    type: types.GET_BLOCKS_DATA_FAILURE,
    node,
  };
};

export function getBlocksData(node) {
  return async (dispatch) => {
    try {
      dispatch(getBlocksDataStart(node));
      const res = await fetch(`${node.url}/api/v1/blocks`);

      if(res.status >= 400) {
        dispatch(getBlocksDataFailure(node));
      }

      const json = await res.json();

      let blocksList = []

      json.data.forEach((block) => {
        blocksList.push({
            data: block.attributes.data,
            id: block.id 
        })
      })

      dispatch(getBlocksDataSuccess(node, blocksList));
    } catch (err) {
        console.log(err, 'ERR')
      dispatch(getBlocksDataFailure(node));
    }
  };
}

