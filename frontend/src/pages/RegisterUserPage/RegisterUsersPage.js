import FormsUsers from "./FormsUsers";
import ContainerComponent from "../../components/layout/Container";
import HeaderPage from "../../components/layout/HeaderPage";
import styles from "./RegisterUsersPage.module.css"; 

function RegisterUsersPage() {
  
  return (
    <>
      <HeaderPage>
        <div className={styles.gray_bar}></div>
      </HeaderPage>
      <ContainerComponent className={styles.content}>
        <FormsUsers />
      </ContainerComponent>
    </>
    
  );
}

export default RegisterUsersPage;
