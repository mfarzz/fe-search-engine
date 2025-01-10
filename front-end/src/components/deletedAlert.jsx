// useDeleteAlert.js
import Swal from 'sweetalert2';

const useDeleteAlert = () => {
  const deleteAlert = (nama) => {
    Swal.fire({
      title: `Apakah Anda yakin ingin menghapus ${nama}?`,
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Hapus!',
      reverseButtons: true, // Menukar posisi tombol
    }).then((result) => {
      if (result.isConfirmed) {
        
        Swal.fire(
          'Terhapus!',
          `${nama} telah dihapus.`,
          'success'
        );
      }
    });
  };

  return { deleteAlert };
};

export default useDeleteAlert;
