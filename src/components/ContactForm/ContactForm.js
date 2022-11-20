import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'components/redux/actions';
import contactform from './ContactForm.module.css';
import { getContacts } from 'components/redux/selectors';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return new Error(`Something went wrong in ContactForm`);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isContact = contacts.find(contact => contact.name === name);
    if (isContact) {
      alert(`${name} is already in contact`);
    } else {
      dispatch(
        actions.contactAdd({
          name,
          number,
        })
      );
      setName('');
      setNumber('');
    }
  };

  return (
    <form className={contactform.form} action="submit" onSubmit={handleSubmit}>
      <div className={contactform.container}>
        <label className={contactform.label}>
          <span className={contactform.label__title}>Name</span>
          <input
            className={contactform.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleInputChange}
          />
        </label>
        <label className={contactform.label}>
          <span className={contactform.label__title}>Number</span>
          <input
            className={contactform.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleInputChange}
          />
        </label>
        <button className={contactform.button} type="submit">
          Add contact
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
