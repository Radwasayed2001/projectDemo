document.querySelector('.ui-wheel-of-fortune button').addEventListener('click', function() {
  const wheel = document.querySelector('.ui-wheel-of-fortune ul');
  const segments = 12;
  const randomIndex = Math.floor(Math.random() * segments);
  const degrees = 360 * 5 + (360 / segments) * randomIndex; // 5 full rotations + segment rotation
  console.log(randomIndex);
  wheel.style.transition = 'transform 4s ease-out';
  wheel.style.transform = `rotate(${degrees}deg)`;

  setTimeout(() => {
      Swal.fire({
          title: 'Congratulations!',
          text: `You won $${(randomIndex) * 1000}!`,
          icon: 'success',
          confirmButtonText: 'Awesome!',
          confirmButtonColor: 'rgb(254, 44, 85)'
      });
  }, 4000); // 4 seconds
});