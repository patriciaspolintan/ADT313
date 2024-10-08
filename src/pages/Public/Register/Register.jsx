import { useState, useRef, useCallback, useEffect } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [middleName, setmiddleName] = useState('');
    const [contactNo, setcontactNo] = useState('');
    const [role, setrole] = useState('');

    const [isFieldsDirty, setIsFieldsDirty] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const middleNameRef = useRef();
    const contactNoRef = useRef();
    const roleRef = useRef();

    const [isShowPassword, setIsShowPassword] = useState(false);
    const userInputDebounce = useDebounce({ email, password }, 2000);
    const [debounceState, setDebounceState] = useState(false);
    const [status, setStatus] = useState('idle');

    const navigate = useNavigate();

    const handleShowPassword = useCallback(() => {
        setIsShowPassword((value) => !value);
    }, [isShowPassword]);

    const handleOnChange = (event, type) => {
        setDebounceState(false);
        setIsFieldsDirty(true);

        switch (type) {
            case 'email':
                setEmail(event.target.value);
                break;

            case 'password':
                setPassword(event.target.value);
                break;

            case 'firstName':
                setfirstName(event.target.value);
                break;

            case 'lastName':
                setlastName(event.target.value);
                break;

            case 'middleName':
                setmiddleName(event.target.value);
                break;

            case 'contactNo':
                setcontactNo(event.target.value);
                break;

            case 'role':
                setrole(event.target.value);
                break;

            default:
                break;
        }
    };

    const handleRegister = async () => {
        const data = { email, password, firstName, lastName, middleName, contactNo, role };
        setStatus('loading');
        console.log(data);

        await axios({
            method: 'post',
            url: '/admin/register',
            data,
            headers: { 'Access-Control-Allow-Origin': '*' },
        })
            .then((res) => {
                console.log(res);
                localStorage.setItem('accessToken', res.data.access_token);
                navigate('/');
                setStatus('idle');
            })
            .catch((e) => {
                console.log(e);
                setStatus('idle');
                alert(e.response.data.message);
            });
    };

    useEffect(() => {
        setDebounceState(true);
    }, [userInputDebounce]);

    return (
        <div className='Register'>
            <div className='main-container'>
                <h3>Register</h3>
                <form>
                    <div className='form-container'>
                        <div className='form-group'>
                            <label>First Name:</label>
                            <input
                                type='text'
                                name='firstName'
                                ref={firstNameRef}
                                onChange={(e) => handleOnChange(e, 'firstName')}
                            />
                            {debounceState && isFieldsDirty && firstName === '' && (
                                <span className='errors'>This field is required</span>
                            )}
                        </div>
                        <div className='form-group'>
                            <label>Last Name:</label>
                            <input
                                type='text'
                                name='lastName'
                                ref={lastNameRef}
                                onChange={(e) => handleOnChange(e, 'lastName')}
                            />
                            {debounceState && isFieldsDirty && lastName === '' && (
                                <span className='errors'>This field is required</span>
                            )}
                        </div>
                        <div className='form-group'>
                            <label>Middle Name:</label>
                            <input
                                type='text'
                                name='middleName'
                                ref={middleNameRef}
                                onChange={(e) => handleOnChange(e, 'middleName')}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Email:</label>
                            <input
                                type='text'
                                name='email'
                                ref={emailRef}
                                onChange={(e) => handleOnChange(e, 'email')}
                            />
                            {debounceState && isFieldsDirty && email === '' && (
                                <span className='errors'>This field is required</span>
                            )}
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input
                                type={isShowPassword ? 'text' : 'password'}
                                name='password'
                                ref={passwordRef}
                                onChange={(e) => handleOnChange(e, 'password')}
                            />
                            {debounceState && isFieldsDirty && password === '' && (
                                <span className='errors'>This field is required</span>
                            )}
                        </div>
                        <div className='form-group'>
                            <label>Contact No:</label>
                            <input
                                type='text'
                                name='contactNo'
                                ref={contactNoRef}
                                onChange={(e) => handleOnChange(e, 'contactNo')}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Role:</label>
                            <input
                                type='text'
                                name='role'
                                ref={roleRef}
                                onChange={(e) => handleOnChange(e, 'role')}
                            />
                        </div>
                        <div className='show-password' onClick={handleShowPassword}>
                            {isShowPassword ? 'Hide' : 'Show'} Password
                        </div>

                        <div className='submit-container'>
                            <button
                                type='button'
                                disabled={status === 'loading'}
                                onClick={() => {
                                    if (status === 'loading') return;

                                    if (email && password && firstName && lastName && role) {
                                        handleRegister();
                                    } else {
                                        setIsFieldsDirty(true);
                                        if (email === '') emailRef.current.focus();
                                        if (password === '') passwordRef.current.focus();
                                        if (firstName === '') firstNameRef.current.focus();
                                        if (lastName === '') lastNameRef.current.focus();
                                    }
                                }}
                            >
                                {status === 'idle' ? 'Register' : 'Loading'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
