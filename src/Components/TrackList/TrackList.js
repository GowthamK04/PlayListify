import React from "react";
import "./TrackList.css"
import { Track } from "../Track/Track";

export class TrackList extends React.Component{
    render(){
        return(
            <div className="TrackList">
                {this.props.tracks.map(song=>{
                    return(
                        <Track 
                            key={song.id} 
                            track={song} 
                            onAdd={this.props.onAdd} 
                            onRemove={this.props.onRemove}
                            isRemoval={this.props.isRemoval}
                        />
                    );
                })}
            </div>
        );
    }
}