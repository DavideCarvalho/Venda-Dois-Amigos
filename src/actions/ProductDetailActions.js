export const CHANGE_CARD_STATE = 'CHANGE_CARD_STATE';
export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export const CHANGE_CARD_FOCUS = 'CHANGE_CARD_FOCUS';
export const LOAD_PRODUCT_DETAIL = 'LOAD_PRODUCT_DETAIL';
export const BUY_PRODUCT = 'BUY_PRODUCT';
export const CARD_INFORMATION_DEFAULT_VALUES = 'CARD_INFORMATION_DEFAULT_VALUES';
export const CUSTOMER_INFORMATION_DEFAULT_VALUES = 'CUSTOMER_INFORMATION_DEFAULT_VALUES';
export const NEXT = 'NEXT';
export const PREVIOUS = 'PREVIOUS';
export const CHANGE_BILLING_STATE = 'CHANGE_BILLING_STATE';

export const changeCardState = ({propertyKey, value}) =>  
  dispatch => {
    dispatch({
      type: CHANGE_CARD_STATE,
      payload: {
        propertyKey,
        value
      }
    });
  }

  export const changeBillingState = ({propertyKey, value}) =>  
  dispatch => {
    dispatch({
      type: CHANGE_BILLING_STATE,
      payload: {
        propertyKey,
        value
      }
    });
  }

export const changeCardFocus = ({focusedKey}) =>
  dispatch => {
    dispatch({
      type: CHANGE_CARD_FOCUS,
      payload: {
        focusedKey
      }
    });
  }

export const next = (currentState) =>
  dispatch => {
    dispatch({
      type: NEXT,
      payload: {
        state: currentState + 1
      }
    })
  }

export const previous = (currentState) =>
  dispatch => {
    dispatch({
      type: PREVIOUS,
      payload: {
        state: currentState - 1
      }
    })
  }

export const loadProductDetail = (productName) => 
  dispatch => {
    dispatch({
      type: LOAD_PRODUCT_DETAIL,
      payload: {
        productName
      }
    })
  }

export const buyProduct = () =>
  dispatch => {
    dispatch({
      type: BUY_PRODUCT,
      payload: {}
    })
  }

export const cardInformationDefaultValues = () =>
  dispatch => {
    
    dispatch({
      type: CARD_INFORMATION_DEFAULT_VALUES,
      payload: {
        holderName: 'João',
        number: '5580400514542835',
        expirationDate: '08/19',
        cvc: '124',
        cpf: '36945222047'
      }
    })
  }

export const customerInformationDefaultValues = () =>
  dispatch => {
    dispatch({
      type: CUSTOMER_INFORMATION_DEFAULT_VALUES,
      payload: {
        completeName: 'João da Silva Flores',
        phoneNumber: '+5513988567483',
        email: 'joao.flores@gmail.com',
        cpf: '36945222047'
      }
    })
  }

export const buyRequest = async ({productDetail: {cardInformation, customerInformation}}) =>
  dispatch => {
    let expiry = cardInformation.expirationDate;
    expiry = expiry.substring(0, 2) + expiry.substring(3, expiry.length);
    const phoneNumbers = [];
    phoneNumbers.push(customerInformation.phoneNumber);
    try {
      const client = await pagarme
        .client
        .connect({api_key: API_KEY});
      const transaction = await client
        .transactions
        .create({
          amount: 100,
          card_number: cardInformation.number,
          card_cvv: cardInformation.cvc,
          card_expiration_date: expiry,
          card_holder_name: cardInformation.holderName,
          customer: {
            external_id: "#3311",
            name: customerInformation.completeName,
            type: "individual",
            country: "br",
            email: customerInformation.email,
            documents: [
              {
                type: "cpf",
                number: customerInformation.cpf
              }
            ],
            phone_numbers: phoneNumbers,
            birthday: "1996-10-25"
          },
          billing: {
            name: "Trinity Moss",
            address: {
              country: "br",
              state: "sp",
              city: "Cotia",
              neighborhood: "Rio Cotia",
              street: "Rua Matrix",
              street_number: "9999",
              zipcode: "06714360"
            }
          },
          shipping: {
            name: "Neo Reeves",
            fee: 1000,
            delivery_date: "2000-12-21",
            expedited: true,
            address: {
              country: "br",
              state: "sp",
              city: "Cotia",
              neighborhood: "Rio Cotia",
              street: "Rua Matrix",
              street_number: "9999",
              zipcode: "06714360"
            }
          },
          items: [
            {
              id: "r123",
              title: this.state.product.name,
              unit_price: Math.floor(this.state.product.value),
              quantity: 1,
              tangible: true
            }
          ],
          split_rules: [
            {
              recipient_id: "re_cjlei943y016xf96e1bc4jv1x",
              percentage: 25,
              liable: true,
              charge_processing_fee: true
            },
            {
              recipient_id: "re_cjlc7hst2009lu16d5a93zsff",
              percentage: 15,
              liable: true,
              charge_processing_fee: true
            }, {
              recipient_id: "re_cjlei9ni8016zf96e97gfnd6l",
              percentage: 60,
              liable: true,
              charge_processing_fee: true
            }
          ]
        });
      console.log(transaction);
      if (transaction.status === 'paid') {
        Promise.resolve({title: 'Comprado', message: 'Produto comprado com sucesso!'});
      }
    } catch (e) {
      Promise.reject(e);
    }
  }