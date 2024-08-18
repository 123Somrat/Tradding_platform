import Swal, { SweetAlertIcon } from "sweetalert2";

type err = {
  icon: SweetAlertIcon;
  title: string;
};

export default function showInfoAlert(err: err) {
  return Swal.fire({
    icon: err.icon,
    title: err.title,
  });
}
