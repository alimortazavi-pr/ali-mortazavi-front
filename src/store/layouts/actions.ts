import { AppThunk } from "@/store";

//Actions of other store

//Reducer
import { layoutReducer } from "@/store/layouts";

//Actions from reducer

//Interfaces
import { IContactMeForm } from "@/common/interfaces/layouts.interface";

//Tools
import api from "@/common/api";

//Actions from actions
export function sendContactMeMessage(form: IContactMeForm): AppThunk {
  return async (dispatch, getState) => {
    try {
      await api.post("/messages/send-contact-me-message", form);
    } catch (err: any) {
      throw new Error(err.response?.data?.message);
    }
  };
}
