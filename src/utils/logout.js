import Swal from "sweetalert2"

export const logout = () => {
    Swal.fire({
        title: "¿Estás seguro de que deseas cerrar sesión?",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: `Cancelar`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            localStorage.removeItem('userData')
            localStorage.removeItem('perfil')
            Swal.fire({
                title: 'Sesión cerrada',
                text: 'Has cerrado sesión correctamente.',
                icon: 'success',
                confirmButtonText: 'Ok',
            }).then(() => {
                window.location.href = '/';
            })
        } else if (result.isDenied) {
          Swal.close()
        }
      })
}