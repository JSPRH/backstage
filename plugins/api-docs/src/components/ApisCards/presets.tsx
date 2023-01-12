/*
 * Copyright 2020 The Backstage Authors
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

import { ApiEntity, Entity } from '@backstage/catalog-model';
import { EntityTable } from '@backstage/plugin-catalog-react';
import React, { useState } from 'react';
import { ApiTypeTitle } from '../ApiDefinitionCard';
import { ApiDefinitionDialog } from '../ApiDefinitionDialog';
import { TableColumn } from '@backstage/core-components';
import { ToggleButton } from '@material-ui/lab';
import ExtensionIcon from '@material-ui/icons/Extension';

export function createSpecApiTypeColumn(): TableColumn<ApiEntity> {
  return {
    title: 'Type',
    field: 'spec.type',
    render: entity => <ApiTypeTitle apiEntity={entity} />,
  };
}

function createApiDefinitionColumn<T extends Entity>(): TableColumn<T> {
  const ApiDefinitionButton = ({ entity }: any) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
      <>
        <ToggleButton onClick={() => setDialogOpen(!dialogOpen)}>
          <ExtensionIcon />
        </ToggleButton>
        <ApiDefinitionDialog
          entity={entity}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      </>
    );
  };

  return {
    title: 'API Definition',
    render: entity => <ApiDefinitionButton entity={entity} />,
  };
}

// TODO: This could be moved to plugin-catalog-react if we wouldn't have the
// special createSpecApiTypeColumn and createApiDefinitionColumn. But this is
// required to use ApiTypeTitle to resolve the display name of an entity and
// offer the API definition quick look button. Is it really worth it?

export const apiEntityColumns: TableColumn<ApiEntity>[] = [
  EntityTable.columns.createEntityRefColumn({ defaultKind: 'API' }),
  EntityTable.columns.createSystemColumn(),
  EntityTable.columns.createOwnerColumn(),
  createSpecApiTypeColumn(),
  EntityTable.columns.createSpecLifecycleColumn(),
  EntityTable.columns.createMetadataDescriptionColumn(),
  createApiDefinitionColumn(),
];
