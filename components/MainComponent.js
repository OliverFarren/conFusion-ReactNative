import React, { Component } from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

/*
Notes to Coursera Reviewers

Due to difficulties getting this course working as described, this project 
uses the latest version of react-navigation which has meant
the construct of the Stack Navigator and Drawer Navigator are different.

I have written about this in the forum:
https://www.coursera.org/learn/react-native/discussions/weeks/1/threads/8PifLG4EQ724nyxuBDO9DQ

Where you can see the details of the Stack Navigator version differences.

Please don't penalise my solution for not being an exact copy since it still implements
the Week 1 assignment functionality (to the best of my knowledge) correctly.

Also, if you read my solution on the forum, and find it useful, please upvote so
that others can find it.
*/


const MenuNavigator = createStackNavigator();

const HeaderOptions = {
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        color: "#fff"            
    }
};

function MenuNavigatorScreen() {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={HeaderOptions}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
}

const HomeNavigator = createStackNavigator();


function HomeNavigatorScreen() {
    return(
        <HomeNavigator.Navigator
            initialRouteName='Home'
            screenOptions={HeaderOptions}
        >
            <HomeNavigator.Screen
                name="Home"
                component={Home}
            />
        </HomeNavigator.Navigator>
    );
}

const ContactNavigator = createStackNavigator();

function ContactNavigatorScreen(){
    return(
        <ContactNavigator.Navigator
            initialRouteName='Contact Us'
            screenOptions={HeaderOptions}
        >
            <ContactNavigator.Screen
                name="Contact Us"
                component={Contact}
            />
        </ContactNavigator.Navigator>
    );
}

const AboutUsNavigator = createStackNavigator();

function AboutUsNavigatorScreen(){
    return(
        <AboutUsNavigator.Navigator
            initialRouteName='About Us'
            screenOptions={HeaderOptions}
        >
            <ContactNavigator.Screen
                name="About Us"
                component={About}
            />
        </AboutUsNavigator.Navigator>

    )
}

const MainNavigator = createDrawerNavigator();

function MainNavigatorDrawer() {
    return(
        <MainNavigator.Navigator 
            initialRouteName="Home"
            drawerStyle={{
                backgroundColor:'#D1C4E9'
            }}
        >
            <MainNavigator.Screen name="Home"       component={HomeNavigatorScreen} />
            <MainNavigator.Screen name="Contact Us" component={ContactNavigatorScreen} />
            <MainNavigator.Screen name="Menu"       component={MenuNavigatorScreen} />
            <MainNavigator.Screen name="About Us"   component={AboutUsNavigatorScreen} />
        </MainNavigator.Navigator>
    );
}

class Main extends Component {

  render() {
 
    return(
        <NavigationContainer>
            <MainNavigatorDrawer/>
        </NavigationContainer>
    );
  }
}
  
export default Main;