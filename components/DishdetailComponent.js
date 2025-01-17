import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder, Share } from 'react-native';
import { Rating, Card, Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (comment) => dispatch(postComment(comment))
})

function RenderComments(props) {

    const comments = props.comments;
            
    
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating imageSize={20} readonly startingValue={item.rating}/>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>        
            <Card title='Comments' >
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
        </Animatable.View>
    );
}

function RenderDish(props) {

    var viewRef;

    const handleViewRef = ref => viewRef = ref;

    const dish = props.dish;
    
    const recognizeDragRightToLeft = ({ dx }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }

    //Recognises drag from Left to Right
    const recognizeComment = ({dx}) => {
        if ( dx > 200 )
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            viewRef.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDragRightToLeft(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onFavoritePress()}},
                    ],
                    { cancelable: false }
                );
            //React Native Assignment Week 3 Task 3
            if (recognizeComment(gestureState))
                props.onCommentPress();

            return true;
        }
    })

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }

    if (dish != null) {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
            ref={handleViewRef}
            {...panResponder.panHandlers}>
                <Card
                    featuredTitle={dish.name}
                    image={{uri: baseUrl + dish.image}}
                >
                    <View style={styles.Row}>
                        <Text style={{margin: 10}}>
                            {dish.description}
                        </Text>
                    </View>
                    <View style={styles.Row}>
                        <Icon
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onFavoritePress()}
                        />
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => props.onCommentPress()}
                        />
                         <Icon
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            style={styles.cardItem}
                            onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} 
                        />
                    </View>
                </Card>    
            </Animatable.View>         
        );
    }
    else {
        return(<View></View>);
    }
}

const modalAuthorInput = React.createRef();
const modalCommentInput = React.createRef();

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            showModal: false,
            dishId: null,
            rating: 5,
            author: '',
            comment: ''
        };

    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});    
    }


    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    handleComment() {

        this.props.postComment({
            dishId: this.state.dishId,
            rating: this.state.rating,
            comment: this.state.comment,
            author: this.state.author
        });
        this.resetCommentForm();
    }

    resetCommentForm() {
        this.setState({
            showModal: false,
            rating: 5,
            author: '',
            comment: ''
        });
        modalAuthorInput.current.clear();
        modalCommentInput.current.clear();
    }

    render() {

        const dishId = this.props.route.params.dishId;

        return(
            <ScrollView>
                <RenderDish 
                    dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onFavoritePress={() => this.markFavorite(dishId)} 
                    onCommentPress={() => {this.toggleModal(); this.setState({dishId})} }
                />
                <RenderComments 
                    comments={this.props.comments.comments.filter((comment) => 
                        comment.dishId === dishId)} 
                />
                <Modal 
                    animationType = {"slide"} 
                    transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }
                >
                    <View style = {styles.modal}>
                        <Rating
                            value={this.state.rating}
                            startingValue={5}
                            showRating={true}
                            onFinishRating={(rating) => this.setState({rating})}
                            style={{ paddingVertical: 10 }}
                        />
                        <Input
                            ref={modalAuthorInput}
                            placeholder=' Author'
                            leftIcon={{ 
                                type: 'font-awesome', 
                                name: 'user-o'
                            }}
                            onChangeText={ (author) => this.setState({author})}
                        />
                        <Input
                            ref={modalCommentInput}
                            placeholder=' Comment'
                            leftIcon={{ 
                                type: 'font-awesome', 
                                name: 'comment-o'
                            }}
                            onChangeText={ (comment) => this.setState({comment})}
                        />
                        <View style={styles.modalText}>
                            <Button 
                                onPress = {() => {
                                    this.handleComment(); 
                                    this.resetCommentForm();
                                }}
                                color="#512DA8"
                                title="Submit" 
                            />   
                        </View>        
                        <View style={styles.modalText}>
                            <Button 
                                onPress = {() => this.resetCommentForm()}
                                color="#808080"
                                title="Cancel" 
                            />
                        </View>        
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    Row: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
      },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         margin: 5
     }
  });

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);