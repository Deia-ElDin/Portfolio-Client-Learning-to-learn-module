import { within } from '@testing-library/react';
import { projectsData } from '../../../mocks/entities';
import {
  yellowStarSvg,
  lightBlueStarSvg,
  checkedSvg,
  uncheckedSvg,
} from '../../../features/helpers/srcs/handleImgsSrc';

const mswData = projectsData;

export const testProject = ({ projectsBlock, index }) => {
  const projectData = mswData[index];
  testTopSection(projectsBlock, projectData);
  testMiddleSection(projectsBlock, projectData);
  testBottomSection(projectsBlock, projectData);
};

const testTopSection = (projectsBlock, projectData) => {
  const topSection = within(projectsBlock).getByRole('region', {
    name: 'Project image',
  });
  const projectLink = within(topSection).getByRole('link');
  const link = projectData.uiLiveDemoLink
    ? projectData.uiLiveDemoLink
    : projectData.serverLiveDemoLink
    ? projectData.serverLiveDemoLink
    : null;
  const projectImg = within(topSection).getByRole('img', {
    name: projectData.projectName,
  });

  expect(topSection).toBeInTheDocument();
  expect(projectLink).toBeInTheDocument();
  expect(projectLink).toHaveAttribute('href', link);
  expect(projectImg).toBeInTheDocument();
  expect(projectImg).toHaveAttribute('alt', projectData.projectName);
};

const testMiddleSection = (projectsBlock, projectData) => {
  const middleSection = within(projectsBlock).getByRole('region', {
    name: 'Project features',
  });
  const projectName = within(middleSection).getByRole('heading', {
    name: projectData.projectName,
  });

  expect(middleSection).toBeInTheDocument();
  expect(projectName).toBeInTheDocument();

  testRating(middleSection, projectData);
  testUiAndServer(middleSection, projectData);
  testFeatures(middleSection, projectData);
};

const testRating = (middleSection, projectData) => {
  const rating = projectData.rating;
  const floorRating = Math.floor(rating);
  const isDecimal = rating - floorRating;

  const ratingSection = within(middleSection).getByRole('region', {
    name: 'Rating',
  });
  const ratingHeader = within(ratingSection).getByRole('heading', {
    name: 'Rating',
  });
  const ratingStars = within(ratingSection).getAllByRole('img', {
    name: 'star',
  });
  const starSrc = rating >= 4 ? yellowStarSvg : lightBlueStarSvg;

  expect(ratingSection).toBeInTheDocument();
  expect(ratingHeader).toBeInTheDocument();
  expect(ratingStars.length).toBe(Math.ceil(rating));
  expect(ratingStars[0]).toHaveAttribute('src', starSrc);
  if (isDecimal) {
    const decimalDiv = within(ratingSection).getByTestId('decimal-div');
    expect(decimalDiv).toBeInTheDocument();
    expect(decimalDiv).toHaveStyle(
      `width: ${100 - Math.ceil(isDecimal * 100)}%`
    );
  }
};

const testUiAndServer = (middleSection, projectData) => {
  const UI = projectData.ui;
  const Server = projectData.server;

  const testUi = () => {
    const UIHeader = within(middleSection).queryByRole('heading', {
      name: 'UI',
    });

    if (projectData.ui && projectData.server) {
      // if both are true it means we got a separate ui and server btns
      // else we got only ui and the btns located with the projectName
      expect(UIHeader).toBeInTheDocument();
    } else {
      expect(UIHeader).not.toBeInTheDocument();
    }

    if (projectData.uiLiveDemoLink) {
      const UiLiveDemoBtn = within(middleSection).queryByRole('button', {
        name: 'Ui live demo',
      });
      const UiLiveDemoLink = within(UiLiveDemoBtn).queryByRole('link');
      expect(UiLiveDemoBtn).toBeInTheDocument();
      expect(UiLiveDemoLink).toBeInTheDocument();
      expect(UiLiveDemoLink).toHaveAttribute(
        'href',
        projectData.uiLiveDemoLink
      );
    }

    if (projectData.uiDownloadLink) {
      const UiDownLoadBtn = within(middleSection).queryByRole('button', {
        name: 'Ui download',
      });
      const UiDownLoadLink = within(UiDownLoadBtn).queryByRole('link');
      expect(UiDownLoadBtn).toBeInTheDocument();
      expect(UiDownLoadLink).toBeInTheDocument();
      expect(UiDownLoadLink).toHaveAttribute(
        'href',
        projectData.UiDownLoadLink
      );
    }
  };

  const testServer = () => {
    const ServerHeader = within(middleSection).queryByRole('heading', {
      name: 'Server',
    });

    if (projectData.ui && projectData.server) {
      expect(ServerHeader).toBeInTheDocument();
    } else {
      expect(ServerHeader).not.toBeInTheDocument();
    }

    if (projectData.serverLiveDemoLink) {
      const ServerLiveDemoBtn = within(middleSection).queryByRole('button', {
        name: 'Server live demo',
      });
      const ServerLiveDemoLink = within(ServerLiveDemoBtn).queryByRole('link');
      expect(ServerLiveDemoBtn).toBeInTheDocument();
      expect(ServerLiveDemoLink).toBeInTheDocument();
      expect(ServerLiveDemoLink).toHaveAttribute(
        'href',
        projectData.ServerLiveDemoLink
      );
    }

    if (projectData.serverDownloadLink) {
      const ServerDownLoadBtn = within(middleSection).queryByRole('button', {
        name: 'Server download',
      });
      const ServerDownLoadLink = within(ServerDownLoadBtn).queryByRole('link');
      expect(ServerDownLoadBtn).toBeInTheDocument();
      expect(ServerDownLoadLink).toBeInTheDocument();
      expect(ServerDownLoadLink).toHaveAttribute(
        'href',
        projectData.ServerDownLoadLink
      );
    }
  };

  if (UI && Server) {
    testUi();
    testServer();
  } else if (UI) testUi();
  else testServer();
};

const testFeatures = (middleSection, projectData) => {
  const featuresLabel = within(middleSection).getByText('Features');
  const featuresSwitchBtn = within(middleSection).getByRole('checkbox');
  const featuresContainer =
    within(middleSection).getByTestId(/features-container/i);

  const techTable = within(featuresContainer).getByTestId(/tech-table/i);
  const responsiveHeader = within(featuresContainer).getByRole('heading', {
    name: 'Responsive',
  });
  const responsizeImg = within(featuresContainer).getByRole('img', {
    name: `${projectData.responsive ? 'checked' : 'unchecked'}`,
  });

  if (projectData.testedWith) {
    const testedWithHeader = within(featuresContainer).getByRole('heading', {
      name: 'Tested With',
    });
    expect(testedWithHeader).toBeInTheDocument();
  }

  expect(featuresLabel).toBeInTheDocument();
  expect(featuresSwitchBtn).toBeInTheDocument();
  expect(featuresContainer).toBeInTheDocument();
  expect(techTable).toBeInTheDocument();
  expect(responsiveHeader).toBeInTheDocument();
  projectData.responsive
    ? expect(responsizeImg).toHaveAttribute('src', checkedSvg)
    : expect(responsizeImg).toHaveAttribute('src', uncheckedSvg);
};

const testBottomSection = (projectsBlock, projectData) => {
  const bottomSection = within(projectsBlock).getByRole('region', {
    name: 'Dates',
  });
  const datesLabel = within(bottomSection).getByText('Dates');
  const datesSwitchBtn = within(bottomSection).getByRole('checkbox');
  const datesContainer = within(bottomSection).getByTestId(/dates-container/i);
  const startingDateHeader = within(datesContainer).getByRole('heading', {
    name: 'Starting Date:',
  });
  const startingDateText = within(datesContainer).getByText(
    projectData.startingDate
  );
  const finishingDateHeader = within(datesContainer).getByRole('heading', {
    name: 'Finishing Date:',
  });
  const finishingDateText = within(datesContainer).getByText(
    projectData.finishingDate
  );
  const durationHeader = within(datesContainer).getByRole('heading', {
    name: 'Duration:',
  });
  const durationText = within(datesContainer).getByText(/day/i);

  expect(bottomSection).toBeInTheDocument();
  expect(datesLabel).toBeInTheDocument();
  expect(datesSwitchBtn).toBeInTheDocument();
  expect(datesContainer).toBeInTheDocument();
  expect(startingDateHeader).toBeInTheDocument();
  expect(startingDateText).toBeInTheDocument();
  expect(finishingDateHeader).toBeInTheDocument();
  expect(finishingDateText).toBeInTheDocument();
  expect(durationHeader).toBeInTheDocument();
  expect(durationText).toBeInTheDocument();
  expect(durationText).toHaveTextContent(
    `${projectData.duration > 1 ? 'Days' : 'Day'}`
  );
};
