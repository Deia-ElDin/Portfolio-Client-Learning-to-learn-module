import { renderWithProviders } from '../../test-utils';
import { homeElements } from '../helpers/createElements/home';
import Home from '../../features/home/Home';

describe('Home', () => {
  beforeEach(() => renderWithProviders(<Home />));

  it('should render the home page', () => {
    const { homePage } = homeElements({ homePage: true });
    expect(homePage).toBeInTheDocument();
  });

  it('should render my name', () => {
    const { myName } = homeElements({ myName: true });
    expect(myName).toBeInTheDocument();
  });

  it('should render my job title', () => {
    const { jobTitle } = homeElements({ jobTitle: true });
    expect(jobTitle).toBeInTheDocument();
  });

  it('should render my infos', () => {
    const { myInfos } = homeElements({ myInfos: true });
    expect(myInfos).toBeInTheDocument();
  });

  it('should render the footer with the current year', () => {
    const { footer } = homeElements({ footer: true });
    expect(footer).toBeInTheDocument();
  });
});
