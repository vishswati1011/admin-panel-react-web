export const Selector = {
    login: {
        login_email:
            "xpath=//div[contains(@class, 'emailcontainer')]//input[contains(@type, 'email')]",
        login_password:
            "xpath=//div[contains(@class, 'emailcontainer')]//input[contains(@type, 'password')]",
        login_button:
            "xpath=//div[contains(@class, 'emailcontainer')]//button[contains(@type, 'submit')]",
        eye_icon:
            "xpath=//div[contains(@class,'emailcontainer')]//div[contains(@class,'mb-3')]//i[contains(@class,'login_page_password_visibility')]",
        
    },

    Forgot: {
        forgot_link: "xpath=//div[contains(@class,'login')]//a[contains(@class,'float-right')]",
        forgot_email: "xpath=//div[contains(@class,'emailcontainer')]//input[contains(@class,'form-control')]",
        submit_button: "xpath=//div[contains(@class,'emailcontainer')]//button[contains(@class,'btn btn-secondary')]",
        eye_icon1: "xpath=//div[contains(@class,'emailcontainer')]//i[1]",
        eye_icon2: "xpath=//div[contains(@class,'emailcontainer')]//i[2]",
        forgot_email1: "xpath=//div[contains(@class,'emailcontainer')]//input[contains(@type,'email')]",
        forgot_password: "xpath=//div[contains(@class,'emailcontainer')]//div[2]//input[contains(@type,'password')]",
        forgot_confirm_password: "xpath=//div[contains(@class,'emailcontainer')]//div[3]//input[contains(@type,'password')]",
        forgot_otp: "xpath=//div[contains(@class,'emailcontainer')]//input[contains(@type,'text')]",
        submit_button1: "xpath=//div[contains(@class,'emailcontainer')]//button[contains(@id,'btn1')]",

    },

    drive: {
        drive_logo: "xpath=//div[contains(@class,'section_of_img')]//a[contains(@class,'link_css')]",
        click_add: "xpath=//div[contains(@class,'add_new_text')]//span",
        search: "xpath=//input[contains(@id,'standard-bare')][1]",
        search_filter: "xpath=//button[contains(@class,'MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1yxmbwk')][2]",
        search_filter_type: "xpath=//select[contains(@class,'searchBarPopup_selector')][1]",
        search_filter_owner: "xpath=//select[contains(@class,'searchBarPopup_selector')][2]",
        click_grid_icon: "xpath=//button[contains(@class,'navbar_hidden_arrow__aW8Cu d-flex dropdown-toggle')]",
        click_grid_icon_takdeployer: "xpath=//div[contains(@class, 'dropdown')]//ul[contains(@class, 'dropdown-menu')]/div[1]",
        click_grid_icon_cxdeployer: "xpath=//div[contains(@class, 'dropdown')]//ul[contains(@class, 'dropdown-menu')]/div[3]",
        click_grid_icon_ideadeployer: "xpath=//div[contains(@class, 'dropdown')]//ul[contains(@class, 'dropdown-menu')]/div[5]",
        click_grid_icon_riskdeployer: "xpath=//div[contains(@class, 'dropdown')]//ul[contains(@class, 'dropdown-menu')]/div[7]",
        click_grid_icon_forms: "xpath=//div[contains(@class, 'dropdown')]//ul[contains(@class, 'dropdown-menu')]/div[9]",
        click_grid_icon_whiteboard: "xpath=//div[contains(@class, 'dropdown')]//ul[contains(@class, 'dropdown-menu')]/div[11]",
        profile_icon: "xpath=//div[contains(@class,'profile_div')]",
        profile_edit_icon: "xpath=//div[contains(@class,'profileEdit_edit_icon__')]//span",
        profile_edit_text: "xpath=//div[contains(@class,'edit_area_container')]//input[contains(@class,'edit_name_input')]",
        profile_name_save: "xpath=//div[contains(@class,'modal-content')]//button[contains(@class,'save_button')]",
        profile_edit_close_button: "xpath=//div[contains(@class,'modal-content')]//button[contains(@class,'btn-close')]",
        my_profile: "xpath=//div[contains(@class,'navbar_user_details_popup')]/a[contains(@class,'navbar_link_css')]/span[contains(@class,'navbar_user_logout')]",
        reset_password: "xpath=//div[contains(@class,'navbar_profile_popup_div')]//div[contains(@class,'navbar_user_details_popup')]//span[contains(@id,'Reset Password')]",
        reset_old_password: "xpath=//input[contains(@id,'employeeFirstoldPasswordId')]",
        reset_old_password_eye: "xpath=//form[contains(@class,'passwordreset_form_head_section')]/div[contains(@class,'passwordreset')]/i[contains(@class,'passwordreset')]",
        reset_new_password: "xpath=//input[contains(@id,'employeenewPasswordId')]",
        reset_new_password_eye: "xpath=//form[contains(@class,'passwordreset_form_head_section')]/div[2]/i[contains(@class,'passwordreset')]",
        reset_confirm_password: "xpath=//input[contains(@id,'employeePasswordId')]",
        confirm_password_button: "xpath=//div[contains(@class,'button_container')]//button[contains(@class,'save_button')]",
        reset_confirm_password_eye: "xpath=//form[contains(@class,'passwordreset_form_head_section')]/div[3]/i[contains(@class,'passwordreset')]",
        close_icon_reset: "xpath=//div[contains(@class,'modal_headers')]//*[local-name()='svg']",
        logout: "xpath=//div[contains(@class,'navbar_profile_popup_div')]//div[contains(@class,'navbar_user_details_popup')]//span[2]",
    },

    sidebar: {
        click_drive_logo: "xpath=//div[contains(@class,'section_of_img')]//a[contains(@class,'link_css')]",
        click_plus_icon: "xpath=//div[contains(@class,'add_new_text')]//span",
        click_plus_icon_add_idea: "xpath=//div[contains(@class,'add')]//div[2]//span[1]",
        click_plus_icon_add_cx: "xpath=//div[contains(@class,'add')]//div[3]//span[1]",
        click_plus_icon_add_task: "xpath=//div[contains(@class,'add')]//div[1]//span[1]",
        click_plus_icon_add_form: "xpath=//div[contains(@class,'add')]//div[4]//span[1]",
         my_drive: "xpath=//div[contains(@class, 'side_nav')]/div[contains(@class, 'sidebar')]/div[contains(@class, 'side_contain')]/div[contains(@class, 'sidebar_tab2')]//a[1]",
        my_drive_select_workspace: "xpath=//table[contains(@class,'workspace_table')]//tbody[1]/tr[1]/td[contains(@class,'workspace_file_td')]",
        my_drive_select_workspace_threedots: "xpath=//table[contains(@class, 'workspace_table')]/tbody[1]/tr[contains(@id, '1')]/td[contains(@class, 'workspace_owner_menu')]/div[contains(@class, 'action_buttons')]/div[2]",
        my_drive_select_workspace_delete: "xpath=//div[contains(@class,'MuiPaper-root')]//ul[1]//div[contains(@id,'1hbhv')]",
        my_drive_select_workspace_star: "xpath=//table[contains(@class, 'workspace_table')]/tbody[1]/tr[contains(@id, '0')]/td[contains(@class, 'workspace_owner_menu')]/div[contains(@class, 'action_buttons')]/div[1]/div[1]//*[local-name()='svg']", //Added this
        my_drive_select_workspace_all: "xpath=//div[contains(@class,'workspace_head')]//div[contains(@class,'sort_product_wise')]//div[1]",
        my_drive_select_workspace_task: "xpath=//div[contains(@class,'workspace_head')]//div[contains(@class,'sort_product_wise')]//div[2]",
        my_drive_select_workspace_cx: "xpath=//div[contains(@class,'workspace_head')]//div[contains(@class,'sort_product_wise')]//div[3]",
        my_drive_select_workspace_idea: "xpath=//div[contains(@class,'workspace_head')]//div[contains(@class,'sort_product_wise')]//div[1]",



        share_with_ne: "xpath=//div[contains(@class, 'side_nav')]/div[contains(@class, 'sidebar')]/div[contains(@class, 'side_contain')]/div[contains(@class, 'sidebar_tab2')]//a[2]",
        stared: "xpath=//div[contains(@class, 'side_nav')]/div[contains(@class, 'sidebar')]/div[contains(@class, 'side_contain')]/div[contains(@class, 'sidebar_tab2')]//a[3]",
        trash: "xpath=//div[contains(@class, 'side_nav')]/div[contains(@class, 'sidebar')]/div[contains(@class, 'side_contain')]/div[contains(@class, 'sidebar_tab2')]//a[4]",
        user: "xpath=//div[contains(@class, 'side_nav')]/div[contains(@class, 'sidebar')]/div[contains(@class, 'side_contain')]/div[contains(@class, 'sidebar_tab2')]//a[6]",
        role: "xpath=//div[contains(@class, 'side_nav')]/div[contains(@class, 'sidebar')]/div[contains(@class, 'side_contain')]/div[contains(@class, 'sidebar_tab2')]//a[7]",
        group: "xpath=//div[contains(@class, 'side_nav')]/div[contains(@class, 'sidebar')]/div[contains(@class, 'side_contain')]/div[contains(@class, 'sidebar_tab2')]//a[8]",
        addUser_button: "xpath=//div[contains(@class,'employee_employees')]//div[contains(@class,'employees_add_employee')]",
        save_button: "xpath=//div[contains(@class,'button_container')]//button[contains(@class,'save_button')]",
        cancel_button: "xpath=//div[contains(@class,'button_container')]//button[contains(@class,'cancel_button')]",
        name_field_input: "xpath=//div[contains(@class,'form_group')]//input[contains(@id,'employeeFirstNameId')]",
        email_field_input: "xpath=//div[contains(@class,'form_group')]//input[contains(@id,'employeeEmailId')]",
        select_role: "xpath=//div[contains(@class,'form_group')]//select[contains(@id,'#employeeRole')]",
        password_input: "xpath=//div[contains(@class,'form_group')]//input[contains(@id,'employeePasswordId')]",
        dot_icon: "xpath=//div[contains(@class,'employee_row')]//button[contains(@id,'basic-button')]",
        addRole_button: "xpath=//div[contains(@class,'roles_header')]//div[contains(@class,'roles_add_role')]",
        role_field: "xpath=//form[contains(@class,'form_role')]//input[contains(@class,'add_role_input')]",
        save_button1: "xpath=//div[contains(@class,'button_container')]//button[contains(@class,'role_save_button')]",
        cancel_button1: "xpath=//div[contains(@class,'button_container')]//button[contains(@class,'cancel_button')]",
        addGroup_button: "xpath=//div[contains(@class,'groups_header')]//a[contains(@class,'groups_add_group')]",
        addGroup_button1: "xpath=//div[contains(@class,'add_group_div')]//button[contains(@class,'edit_save_button')]",
        Group_input: "xpath=//div[contains(@class,'edit_group_body')]//input[contains(@class,'edit_group_input')]",
        cross_icon: "xpath=//div[contains(@class,'modal-header')]//button[contains(@class,'btn-close')]",
    },
    role: {
        role_three_dot: "xpath=//div[contains(@class,'_roles_body')]//div[1]//button[1]",
        role_three_dot_second: "xpath=//div[contains(@class,'roles_body')]/div[contains(@id, '2')]//button[1]",
        role_three_dot_third: "xpath=//div[contains(@class,'roles_body')]/div[contains(@id, '3')]//button[1]",
        role_three_dot_fourth: "xpath=//div[contains(@class,'roles_body')]/div[contains(@id, '4')]//button[1]",
        role_three_dot_five: "xpath=//div[contains(@class,'roles_body')]/div[contains(@id, '5')]//button[1]",
        role_edit_click: "xpath=//div[contains(@id, 'simple-menu')]//li[contains(@id, '0jjd')]", //Added this
        role_delete_click: "xpath=//div[contains(@id, 'simple-menu')]//li[contains(@id, '220jb')]",//Added this
        role_input_field: "xpath=//div[contains(@class,'MuiBox-root')]//form[contains(@class,'role_form_role')]/input[contains(@class,'role_add_role_input')]",
        role_save: "xpath=//form[contains(@class,'role_form_role')]/div[contains(@class,'role_edit_modal')]/button[contains(@class,'role_save')]",
        role_close_icon: "xpath=//div[contains(@class,'modal-content')]//button[contains(@class,'btn-close')]",
        role_delete: "xpath=//div[contains(@class,'delete-role-modal-div')]//div[contains(@class,'delete-role-modal-button')][2]",
        role_cancel: "xpath=//div[contains(@class,'delete-role-modal-div')]//div[contains(@class,'delete-role-modal-button')][1]",
    },
    group: {
        group_three_dot: "xpath=//div[contains(@class, 'drive_main_section')]/div[3]//div[contains(@class, 'groups_body')]/div[contains(@id, '8')]/button[@id='8']", //Added This
        group_edit_click: "xpath=//div[contains(@id, 'simple-menu')]//a[1]/li[@id='8jjnhb']",//Added This
        group_edit_back_click: "xpath=//div[contains(@class,'editGroupModal')]//a[contains(@class,'back_button')]",
        group_view_click: "xpath=//div[contains(@id, 'simple-menu')]//a[2]/li[@id='8knjn']",//Added This
        group_view_back_click: "xpath=//div[contains(@class,'editGroupModal')]//a[contains(@class,'back_button')]",
        group_delete_click: "xpath=//div[contains(@id, 'simple-menu')]//li[contains(@id,'8jnjbj')]",
        group_input_field: "xpath=//input[contains(@class,'editGroupModal_edit_group_input')]",
        group_edit_checkbox1: "xpath=//div[contains(@class, 'route_section_div')]/form[1]/table[contains(@class, 'editgroup_table')]/tbody[1]/tr[2]/td[contains(@class, 'user_action_input')]/input[contains(@type, 'checkbox')]",
        group_edit_checkbox2: "xpath=//div[contains(@class, 'route_section_div')]/form[1]/table[contains(@class, 'editgroup_table')]/tbody[1]/tr[3]/td[contains(@class, 'user_action_input')]/input[contains(@type, 'checkbox')]",
        group_edit_checkbox3: "xpath=//div[contains(@class, 'route_section_div')]/form[1]/table[contains(@class, 'editgroup_table')]/tbody[1]/tr[4]/td[contains(@class, 'user_action_input')]/input[contains(@type, 'checkbox')]",
        group_veiw_checkbox1: "xpath=//div[contains(@class, 'add_group_div')]/form[1]/table[contains(@class, 'group_table')]/tbody[contains(@class, 'table_body')]/tr[2]/td[contains(@class, 'user_action_input')]/input[contains(@id,'2hgvg')]",// if you need to change user change in tr and id 1 2 3 4 and so on //
        group_veiw_checkbox2: "xpath=//div[contains(@class, 'add_group_div')]/form[1]/table[contains(@class, 'group_table')]/tbody[contains(@class, 'table_body')]/tr[3]/td[contains(@class, 'user_action_input')]/input[contains(@id,'3hgvg')]",
        group_veiw_checkbox3: "xpath=//div[contains(@class, 'add_group_div')]/form[1]/table[contains(@class, 'group_table')]/tbody[contains(@class, 'table_body')]/tr[4]/td[contains(@class, 'user_action_input')]/input[contains(@id,'4hgvg')]",
        group_save: "xpath=//form[contains(@class,'edit_group_body')]//button[contains(@class,'edit_save_button')]",
        group_edit_save: "xpath=//form[contains(@class,'edit_group_body')]//button[contains(@class,'edit_save_button')]",
        group_edit_delete: "xpath= //div[contains(@class,'modal-content')]//div[contains(@class,'delete-role-modal-button-right')]",
        group_veiw_field: "xpath=//form[contains(@class, 'edit_group_body')]/input[contains(@class, 'edit_group_input')]",
        group_edit_cancel: "xpath=//div[contains(@class,'modal-content')]//div[contains(@class,'delete-role-modal-button')]",
        group_remove_checkbox1: "xpath=//form[contains(@class, 'edit_group_body')]/table[contains(@class, 'editgroup_table')]//tr[1]//td[contains(@class, 'user_action_input')]/input[contains(@type, 'checkbox')]",  // if you need to change user change in tr 1 2 3 4 and so on //
        group_remove_checkbox2: "xpath=//form[contains(@class, 'edit_group_body')]/table[contains(@class, 'editgroup_table')]//tr[2]//td[contains(@class, 'user_action_input')]/input[contains(@type, 'checkbox')]",  // if you need to change user change in tr 1 2 3 4 and so on //
        group_remove_checkbox3: "xpath=//form[contains(@class, 'edit_group_body')]/table[contains(@class, 'editgroup_table')]//tr[3]//td[contains(@class, 'user_action_input')]/input[contains(@type, 'checkbox')]",  // if you need to change user change in tr 1 2 3 4 and so on //
        group_view_remove: "xpath=//form[contains(@class,'edit_group_body')]//button[contains(@class,'edit_save_button')]",
        group_delete: "xpath=//div[contains(@class,'delete-group-modal-div')]//div[contains(@class,'delete-group-modal-button')][2]",
        group_cancel: "xpath=//div[contains(@class,'delete-group-modal-div')]//div[contains(@class,'delete-group-modal-button')][1]",
    },
    user: {
        user_three_dot: "xpath=//div[contains(@class, 'employees_body')]/div[2]/div[contains(@class, 'table_div')]/table[contains(@tabindex, '3')]/tr[contains(@class, 'employee_row')]/div[@id='3hvgf']",
        user_three_dot_second:"xpath=//div[contains(@class, 'employees_body')]/div[2]/div[contains(@class, 'table_div')]/table[contains(@tabindex, '1')]/tr[contains(@class, 'employee_row')]/div[@id='1hvgf']", // if you need to change user chenge 14 to 1 2 3 4 in index and id //
        user_three_dot_third:"xpath=//div[contains(@class, 'employees_body')]/div[2]/div[contains(@class, 'table_div')]/table[contains(@tabindex, '2')]/tr[contains(@class, 'employee_row')]/div[@id='2hvgf']", // if you need to change user chenge 14 to 1 2 3 4 in index and id //
        user_three_dot_fourth:"xpath=//div[contains(@class, 'employees_body')]/div[2]/div[contains(@class, 'table_div')]/table[contains(@tabindex, '3')]/tr[contains(@class, 'employee_row')]/div[@id='3hvgf']", // if you need to change user chenge 14 to 1 2 3 4 in index and id //
        user_three_dot_five:"xpath=//div[contains(@class, 'employees_body')]/div[2]/div[contains(@class, 'table_div')]/table[contains(@tabindex, '4')]/tr[contains(@class, 'employee_row')]/div[@id='4hvgf']", // if you need to change user chenge 14 to 1 2 3 4 in index and id //
        user_edit_click: "xpath=//div[contains(@role, 'presentation')]//li[contains(@id, '3jhvhg')]",
        user_delete_click: "xpath=//div[contains(@role, 'presentation')]//li[contains(@id, '3dhhvd')]",
        user_input_feild: "xpath=//form[contains(@class,'form_head_section')]//input[contains(@class,'add_employee_input')]",
        user_dropdown_feild: "xpath=//form[contains(@class,'form_head_section')]//select[contains(@class,'add_employee_input')]",
        user_cancel: "xpath=//form[contains(@class,'form_head_section')]//button[contains(@class,'cancel_button')]",
        user_save: "xpath=//form[contains(@class,'form_head_section')]//button[contains(@class,'addEmployee_save_button')]",
        user_delete_button: "xpath=//div[contains(@class,'delete_employee_modal')]//button[contains(@class,'delete_button')]",
        user_cancel_button: "xpath=//div[contains(@class,'delete_employee_modal')]//button[contains(@class,'cancel_button')]",
    },
};
