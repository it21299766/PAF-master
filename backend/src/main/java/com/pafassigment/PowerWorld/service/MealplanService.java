package com.pafassigment.PowerWorld.service;

import java.util.List;
import java.util.Optional;

import com.pafassigment.PowerWorld.entity.Mealplan;

public interface MealplanService {

    List<Mealplan> getAllMealplans();

    Optional<Mealplan> getMealplanById(String mealplanId);

    Mealplan createMealplan(Mealplan mealplan);

    Mealplan updateMealplan(Mealplan mealplan);

    void deleteMealplanById(String mealplanId);
}
