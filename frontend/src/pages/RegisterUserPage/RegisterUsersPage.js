import FormsUsers from "./FormsUsers";
import ContainerComponent from "../../components/layout/Container";
import HeaderPage from "../../components/layout/HeaderPage";
import styles from "./RegisterUsersPage.module.css";
import GrayBar from "../../components/GrayBar";

function RegisterUsersPage() {
  return (
    <>
      <HeaderPage>
        <GrayBar>
          <div></div>
        </GrayBar>
      </HeaderPage>
      <ContainerComponent>
        <FormsUsers />
      </ContainerComponent>
    </>
  );
}

export default RegisterUsersPage;
