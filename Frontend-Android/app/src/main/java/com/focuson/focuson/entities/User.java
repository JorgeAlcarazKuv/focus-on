package com.focuson.focuson.entities;

import java.util.List;

public class User {
    private List<Profiles> profiles;


    User() {

    }

    public User(List<Profiles> profiles) {
        this.profiles = profiles;
    }

    public List<Profiles> getProfiles() {
        return profiles;
    }

    public void setProfiles(List<Profiles> profiles) {
        this.profiles = profiles;
    }

}
