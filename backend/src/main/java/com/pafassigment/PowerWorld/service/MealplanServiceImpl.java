package com.pafassigment.PowerWorld.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pafassigment.PowerWorld.dao.Comment_MPDao;
import com.pafassigment.PowerWorld.dao.LikeMealPlanDao;
import com.pafassigment.PowerWorld.dao.MealplanDao;
import com.pafassigment.PowerWorld.dao.UserDao;
import com.pafassigment.PowerWorld.entity.Comment_MP;
import com.pafassigment.PowerWorld.entity.LikeMealPlan;
import com.pafassigment.PowerWorld.entity.Mealplan;
import com.pafassigment.PowerWorld.entity.User;

import java.util.List;
import java.util.Optional;

@Service
public class MealplanServiceImpl implements MealplanService {

    private final MealplanDao mealplanDao;
    private final Comment_MPDao comment_MPDao;
    private final LikeMealPlanDao likeMealPlanDao;
    private final UserDao userDao;

    public MealplanServiceImpl(MealplanDao mealplanDao, Comment_MPDao comment_MPDao,
    LikeMealPlanDao likeMealPlanDao, UserDao userDao) {
        this.mealplanDao = mealplanDao;
        this.comment_MPDao = comment_MPDao;
        this.likeMealPlanDao = likeMealPlanDao;
        this.userDao = userDao;
    }

  

    @Override
    @Transactional(readOnly = true)
    public List<Mealplan> getAllMealplans() {
        List<Mealplan> mealplan = mealplanDao.findAll();
        mealplan.forEach(this::mapValuesTomealplan);
        return mealplan;
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Mealplan> getMealplanById(String mealplanId) {
        Optional<Mealplan> mealplan = mealplanDao.findById(mealplanId);
        mealplan.ifPresent(this::mapValuesTomealplan);
        return mealplan;
    }
    
    @Override
    public Mealplan createMealplan(Mealplan mealplan) {
        if (mealplan == null) {
            throw new IllegalArgumentException("mealplan cannot be null");
        }
        return mealplanDao.save(mealplan);
    }

    @Override
    public Mealplan updateMealplan(Mealplan mealplan) {
        if (mealplan == null) {
            throw new IllegalArgumentException("mealplan cannot be null");
        }
        return mealplanDao.save(mealplan);
    }

    @Override
    public void deleteMealplanById(String mealplanId) {
        mealplanDao.deleteById(mealplanId);
    }

    private void mapValuesTomealplan(Mealplan mealplan) {
        List<Comment_MP> comments = comment_MPDao.findByMealplanId(mealplan.getId());
        mealplan.setComments(comments);
        comments.forEach(comment -> {
            Optional<User> user = userDao.findById(comment.getUserId());
            user.ifPresent(comment::setCommentedUser);
        });

        List<LikeMealPlan> likes = likeMealPlanDao.findByMealplanId(mealplan.getId());
        mealplan.setLikes(likes);

        Optional<User> user = userDao.findById(mealplan.getUserId());
        user.ifPresent(mealplan::setMealplanedUser);
    }
}
