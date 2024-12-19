class BaseModel {
    static SINGLE_LABEL = '';
    static PLURAL_LABEL = '';
  
    constructor() {
      if (this.constructor === BaseModel) {
        throw new Error("BaseModel is an abstract class and cannot be instantiated directly.");
      }
      if (!this.constructor.SINGLE_LABEL || !this.constructor.PLURAL_LABEL) {
        throw new Error("SINGLE_LABEL and PLURAL_LABEL must be defined in the derived class.");
      }
    }
  }
  
  module.exports = BaseModel;