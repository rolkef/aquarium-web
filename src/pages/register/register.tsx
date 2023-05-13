import React from 'react';
import * as Validator from '../../services/utils/validators';
import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonPage } from '@ionic/react';
import { useDispatch } from 'react-redux';
import {LoginRequest, ResponseModel, User, UserClient} from "../../services/rest/interface";
import {BuildForm, FormDescription} from "../../services/utils/form-builder";
import {RouteComponentProps} from "react-router";
import {IConfig} from "../../services/rest/iconfig";
import config from "../../services/rest/server-config"
import {executeDelayed} from "../../services/utils/async-helpers";
import {loggedIn, register} from "../../services/actions/users";


type formData = Readonly<User>;

const formDescription: FormDescription<formData> = {
    name: 'register',
    fields: [
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            position: 'floating',
            color: 'primary',
            validators: [Validator.required, Validator.email]
        },
        {
            name: 'firstname',
            label: 'Firstname',
            type: 'text',
            position: 'floating',
            color: 'primary',
            validators: [Validator.required, Validator.minLength(3)]
        },
        {
            name: 'lastname',
            label: 'Lastname',
            type: 'text',
            position: 'floating',
            color: 'primary',
            validators: [Validator.required, Validator.minLength(3)]
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            position: 'floating',
            color: 'primary',
            validators: [Validator.required]
        }
    ],
    submitLabel: 'Register'
};

const { Form, loading, error } = BuildForm(formDescription);

export const Register: React.FunctionComponent<RouteComponentProps<any>> = props => {
    const dispatch = useDispatch();
    const accessHeader = new IConfig();
    const userClient = new UserClient(accessHeader, config.host);

    const submit = (userData: User) => {
        dispatch(loading(true));
        userClient
            .register(userData)
            .then((userInfo: ResponseModel) => {
                console.log(userInfo);
                const response = register(userInfo);
                dispatch(response);

                if (userInfo) {
                    executeDelayed(200, () => props.history.replace('/home'));
                } else {
                    dispatch(error('Error'));
                }
            })
            .catch((err: Error) => {
                dispatch(error('Error while logging in: ' + err.message));
            })
            .finally(() => dispatch(loading(false)));
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <Form handleSubmit={submit} />
            </IonContent>
        </IonPage>
    );
};

export default Register;