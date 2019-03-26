﻿using ATCommon.Global;
using ATDesktopWin.Controllers;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ATDesktopWin.Views
{
    public partial class HomeView : Form, _View
    {
        public string Title { get => Text; set => Text = value; }

        public Form Form => this;

        public HomeView()
        {
            InitializeComponent();

            pbHeaderPicture.BackgroundImage = LoginInfo.user.gender == Constants.genders[0].value
                ? Properties.Resources.default_user_male
                : Properties.Resources.default_user_female;
        }

        private void HomeView_Shown(object sender, EventArgs e)
        {
            AppManager.Instance.GetCurController<HomeController>().RepresentHeaderBar();
            AppManager.Instance.GetCurController<HomeController>().SwitchToPage(HomeController.Page.DASHBOARD);
        }

        #region header-bar
        internal void SetScreenName(string title)
        {
            lblHeaderTitle.Text = title;
        }

        internal void SetUserPicture(string userPicture)
        {
            try
            {
                pbHeaderPicture.LoadAsync(userPicture);
            }
            catch (InvalidOperationException e)
            {

            }
        }

        internal void SetUserName(string userName)
        {
            lblHeaderName.Text = userName;
        }
        #endregion

        #region page
        internal void ShowPage(HomeController.Page page)
        {
            switch (page)
            {
                case HomeController.Page.DASHBOARD:
                    tcPages.SelectTab(tpDashboard);
                    break;
                case HomeController.Page.FAMILY_TABLE:
                    tcPages.SelectTab(tpFamilyTable);
                    break;
                case HomeController.Page.FAMILY_TREE:
                    tcPages.SelectTab(tpFamilyTree);
                    break;
            }
        }

        internal void StartLoading()
        {
            tcPages.Enabled = false;
        }

        internal void EndLoading()
        {
            tcPages.Enabled = true;
        }
        #endregion
    }
}
