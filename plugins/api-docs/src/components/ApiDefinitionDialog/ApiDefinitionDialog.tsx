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

import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ApiDefinitionCardContent } from '../ApiDefinitionCard';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { ApiEntity, Entity } from '@backstage/catalog-model';

const useDialogStyles = makeStyles(theme =>
  createStyles({
    fullHeightDialog: {
      height: 'calc(100% - 64px)',
    },
    content: {
      width: '100%',
      backgroundColor: theme.palette.background.default,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
      flexShrink: 0,
    },
  }),
);

export const ApiDefinitionDialog = ({
  open,
  onClose,
  entity,
}: {
  open: boolean;
  onClose: () => void;
  entity: ApiEntity;
}) => {
  const classes = useDialogStyles();
  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      open={open}
      onClose={onClose}
      aria-labelledby="api-entity-definition-dialog-title"
      PaperProps={{ className: classes.fullHeightDialog }}
    >
      <DialogTitle id="api-entity-definition-dialog-title">
        API Definition
      </DialogTitle>
      <DialogContent dividers>
        <div className={classes.content}>
          <ApiDefinitionCardContent entity={entity} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
