from airtable import Airtable


def authenticate():
    api_key = 'keyS8sIcmUsk7To9K'
    base_key = 'appdqzfZoeTcXC7VD'
    table_name = 'Config'

    airtable = Airtable(base_key, table_name, api_key=api_key)
    return airtable


'''
-MainMenu
    -Submenu
        -Action
        -Url
'''


def get_airtable_data():
    airtable = authenticate()
    records = airtable.get_all(view='MENU - Homework', formula="NOT({Live}='')")
    clean_data = dict()

    for record in records:
        menu = record.get('fields').get('MainMenu', None)
        submenu = record.get('fields').get('Sub-menu', None)
        action = record.get('fields').get('Actions', None)
        url = record.get('fields').get('URL', None)
        if menu in clean_data.keys():
            if submenu:
                if submenu in clean_data[menu].keys():
                    temp_dict = dict()
                    temp_dict['action'] = action
                    temp_dict['url'] = url
                    clean_data[menu][submenu].append(temp_dict)
                else:
                    temp_dict = dict()
                    temp_dict['action'] = action
                    temp_dict['url'] = url
                    clean_data[menu][submenu] = [temp_dict]
        else:
            temp_dict = dict()
            temp_dict['action'] = action
            temp_dict['url'] = url
            clean_data[menu] = dict()
            clean_data[menu][submenu] = [temp_dict]

    return clean_data
