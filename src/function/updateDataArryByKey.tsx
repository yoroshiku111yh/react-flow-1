import { TypeFetchData } from "../fetchedDataInit";

interface TypeDataUpdateFn {
    key: string;
    id: string;
    value: string | boolean | number | undefined;
  }

export function updateDataObjectInArrayByKey(
    dataInput: TypeFetchData[],
    dataUpdate: TypeDataUpdateFn
  ) {
    const findIndex = dataInput.findIndex((data) => data.id === dataUpdate.id);
    if (findIndex !== -1) {
      dataInput[findIndex].data[dataUpdate.key].value = dataUpdate.value;
      return {
        index : findIndex,
        data : dataInput[findIndex]
      };
    }
    else{
      return false;
    }
  }
  