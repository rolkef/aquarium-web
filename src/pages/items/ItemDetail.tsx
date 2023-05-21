import {RouteComponentProps} from "react-router";
import {RootState} from "../../services/reducers";
import {useDispatch, useSelector} from "react-redux";
import {
    AnimalResult,
    CoralResult,
    fetchAnimalAction,
    fetchCoralAction,
} from "../../services/actions/items";
import {ThunkDispatch} from "redux-thunk";
import React, {useEffect, useState} from "react";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon, IonItem, IonLabel,
    IonMenuButton,
    IonPage, IonSpinner,
    IonTitle, IonToast,
    IonToolbar
} from "@ionic/react";
import {fish, flower} from "ionicons/icons";

export default (mode: 'coral' | 'animal'): React.FC<RouteComponentProps<{ id: string }>> => ({history, match}) => {

    const {aquariumitem, coral, animal, isLoading, errorMessage} = useSelector((s: RootState) => s.items);
    const token = useSelector((s: RootState) => s.user.authenticationInformation!.token || '');
    const dispatch = useDispatch();
    const thunkCoralDispatch = dispatch as ThunkDispatch<RootState, null, CoralResult>;
    const thunkAnimalDispatch = dispatch as ThunkDispatch<RootState, null, AnimalResult>;
    const [itemName, setItemName] = useState('');
    const [itemID, setItemID] = useState('');

    useEffect(() => {
        if(itemID != match.params.id){
            if(mode === 'coral'){
                thunkCoralDispatch(fetchCoralAction(match.params.id)).then(() => {
                    setItemName(coral?.name!);
                    setItemID(coral?.id!);
                });
            }

            if (mode === 'animal'){
                thunkAnimalDispatch(fetchAnimalAction(match.params.id)).then(() => {
                    setItemName(animal?.name!);
                    setItemID(animal?.id!);
                });
            }

        }
    }, [match.params.id]);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonButtons slot="primary">
                        <IonButton onClick={() => history.push('/animal/add')}>
                            <IonIcon slot="icon-only" icon={fish}/>
                        </IonButton>
                        <IonButton onClick={() => history.push('/coral/add')}>
                            <IonIcon slot="icon-only" icon={flower}/>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Corals and Animals List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonLabel>Corals</IonLabel>
                </IonItem>

                {isLoading ? <IonItem><IonSpinner />Loading Values...</IonItem> : <ListCorals/>}

                <IonItem>
                    <IonLabel>Animals</IonLabel>
                </IonItem>

                {isLoading ? <IonItem><IonSpinner />Loading Values...</IonItem> : <ListAnimals/>}

                <IonToast
                    isOpen={errorMessage ? errorMessage.length > 0 : false}
                    onDidDismiss={() => false}
                    message={errorMessage}
                    duration={5000}
                    color='danger'
                />

            </IonContent>
        </IonPage>
    );
};
