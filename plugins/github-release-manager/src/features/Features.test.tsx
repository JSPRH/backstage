/*
 * Copyright 2021 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { render, act, waitFor } from '@testing-library/react';

import { mockApiClient, mockCalverProject } from '../test-helpers/test-helpers';
import { TEST_IDS } from '../test-helpers/test-ids';

jest.mock('../contexts/PluginApiClientContext', () => ({
  usePluginApiClientContext: () => ({
    pluginApiClient: mockApiClient,
  }),
}));
jest.mock('../contexts/ProjectContext', () => ({
  useProjectContext: () => ({
    project: mockCalverProject,
  }),
}));

import { Features } from './Features';

describe('Features', () => {
  it('should omit features omitted via configuration', async () => {
    const { getByTestId } = render(
      <Features
        features={{
          info: { omit: false },
          createRc: { omit: true },
          promoteRc: { omit: true },
          patch: { omit: true },
        }}
      />,
    );

    await act(async () => {
      await waitFor(() => getByTestId(TEST_IDS.info.info));
    });

    expect(getByTestId(TEST_IDS.info.info)).toMatchInlineSnapshot(`
      <div
        class="MuiBox-root MuiBox-root-11"
        data-testid="grm--info"
      >
        <h6
          class="MuiTypography-root MuiTypography-h6"
        >
          Terminology
        </h6>
        <p
          class="MuiTypography-root MuiTypography-body1"
        >
          <strong>
            GitHub
          </strong>
          : The source control system where releases reside in a practical sense. Read more about
           
          <a
            class="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary"
            href="https://docs.github.com/en/github/administering-a-repository/managing-releases-in-a-repository"
            target="_blank"
          >
            GitHub releases
          </a>
          . (Note that this plugin works just as well with GitHub Enterprise.)
        </p>
        <p
          class="MuiTypography-root MuiTypography-body1"
        >
          <strong>
            Release Candidate
          </strong>
          : A GitHub 
          <i>
            prerelease
          </i>
           
          intended primarily for internal testing
        </p>
        <p
          class="MuiTypography-root MuiTypography-body1"
        >
          <strong>
            Release Version
          </strong>
          : A GitHub release intended for end users
        </p>
      </div>
    `);
  });
});
