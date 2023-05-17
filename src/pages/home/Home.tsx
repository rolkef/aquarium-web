import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent, IonImg,
} from '@ionic/react';

import coolImage from '../../assets/docker.png';

const Home: React.FunctionComponent = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard class='welcome-card'>
          <IonCardHeader>
            <IonCardTitle>Welcome to the park of tears 🥹</IonCardTitle>
            <IonCardSubtitle >
              The park of tears is a place where you can share your feelings about not working docker containers. ಥ﹏ಥ
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              <img src={coolImage} alt="Docker"/>
            </p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
