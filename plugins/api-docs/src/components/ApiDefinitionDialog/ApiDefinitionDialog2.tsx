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

import { ApiEntity } from '@backstage/catalog-model';
import { useApi } from '@backstage/core-plugin-api';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { apiDocsConfigRef } from '../../config';
import { PlainApiDefinitionWidget } from '../PlainApiDefinitionWidget';

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
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    tabContents: {
      overflowX: 'auto',
    },
  }),
);

function TabPanel(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;
  const classes = useDialogStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      className={classes.tabContents}
      {...other}
    >
      {value === index && (
        <Box pl={3} pr={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

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

  const [activeTab, setActiveTab] = React.useState(0);

  useEffect(() => {
    setActiveTab(0);
  }, [open]);

  const config = useApi(apiDocsConfigRef);
  const { getApiDefinitionWidget } = config;

  if (!entity) {
    return <Alert severity="error">Could not fetch the API</Alert>;
  }

  const definitionWidget = getApiDefinitionWidget(entity);
  const entityTitle = entity.metadata.title ?? entity.metadata.name;

  let index = 0;

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
        {entityTitle} API Definition
      </DialogTitle>

      <DialogContent dividers>
        <Tabs
          orientation="horizontal"
          variant="scrollable"
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          aria-label="API entity definition options"
          className={classes.tabs}
        >
          {definitionWidget ? (
            <Tab label={definitionWidget.title} {...a11yProps(index++)} />
          ) : (
            ''
          )}
          <Tab label="Raw" {...a11yProps(index)} />
        </Tabs>

        {definitionWidget ? (
          <TabPanel value={activeTab} index={0}>
            {definitionWidget.component(entity.spec.definition)}
          </TabPanel>
        ) : (
          ''
        )}
        <TabPanel value={activeTab} index={index}>
          <PlainApiDefinitionWidget
            definition={entity.spec.definition}
            language={definitionWidget?.rawLanguage || entity.spec.type}
          />
        </TabPanel>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
