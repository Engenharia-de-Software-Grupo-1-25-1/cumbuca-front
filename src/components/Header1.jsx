import cumbucaLogo from '../assets/logo.svg';
import bandeiras from '../assets/bandeiras.svg';

function Header() {
  return (
    <>
      <div className="w-full h-auto max-h-32 sm:max-h-24 lg:max-h-40 object-cover">
        <img
          src={bandeiras}
          alt="Bandeiras"
          className="w-full object-cover"
          style={{ marginTop: '1.5rem' }}
        />
      </div>

      <div className="flex flex-col items-center">
        <a href="./" className="flex flex-col items-center no-underline">
          <img
            src={cumbucaLogo}
            alt="Logo da Cumbuca"
            className="logo h-20 sm:h-24 md:h-28 lg:h-32 w-auto mt-[-1rem] sm:mt-[-1.5rem] md:mt-[-4rem] mb-4"
          />
        </a>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide mb-7">
          CUMBUCA
        </h1>
      </div>
    </>
  );
}

export default Header;
