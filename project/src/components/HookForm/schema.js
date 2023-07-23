import * as yup from 'yup';

const schema = yup.object({
  weight: yup
    .number()
    .required('You must select a weight.'),
  quantity: yup
    .number()
    .required('You must enter an appropriate quantity.')
    .min(0, 'You cannot purchase a negative number of this item.')
});

export default schema;